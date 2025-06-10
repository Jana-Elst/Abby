/*--- pin setup ---*/
/*--- pin setup ---*/
/*
Red led: D2
Green led: D3
Yellow led: D4
*/
#include <Stepper.h>
#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h> // use this for MKR1010 and Nano 33 IoT
#include "arduino_secrets.h"
#include <AccelStepper.h>

// global variables
bool connectionMade = false;
const int stepsPerRevolution = 2048;

struct Clock {
  int number;
  int pinLed;
  AccelStepper* stepper;
  int stepperSteps;
  String status;
  String name;
  long lastSend;
  bool lightOn;
};

Clock clocks[] = {
    {1, 2, new AccelStepper(AccelStepper::FULL4WIRE, 14, 15, 16, 17), 0, "available", "", 0, false},
    {2, 3, new AccelStepper(AccelStepper::FULL4WIRE, 0, 0, 0, 0), 0, "available", "", 0, false},
    {3, 4, new AccelStepper(AccelStepper::FULL4WIRE, 0, 0, 0, 0), 0, "available", "", 0, false},
};



// Get the number of clocks
const int numClocks = sizeof(clocks) / sizeof(clocks[0]);

/*---Connection with socket ---*/
// local websocket setup
WiFiClient wifi;
char serverAddress[] = "172.30.35.28"; /* <-- change this of the network changes */
int port = 3000;                       /* server port */
char endpoint[] = "/";

// initialize the webSocket client
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);

void setup()
{
  Serial.begin(9600);
  if (!Serial)
    delay(3000);

  // connect to WIFi:
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);
    // Connect to WPA/WPA2 network:
    WiFi.begin(SECRET_SSID, SECRET_PASS);
  }

  // print board info
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  client.begin(endpoint);

  // setup electronical parts
  for (int i = 0; i < numClocks; i++)
  {
    pinMode(clocks[i].pinLed, OUTPUT);
  }
}

void loop()
{
  // if not connected to the socket server, try to connect:
  if (!client.connected())
  {
    client.begin();
    delay(1000);
    Serial.println("attempting to connect to server");
    // skip the rest of the loop:
    return;
  }

  if (!connectionMade)
  {
    sendTypeJson();
    connectionMade = true;
  }

  // read messages
  int messageSize = client.parseMessage();
  if (messageSize > 0)
  {
    String message = client.readString();
    readIncomingJson(message);
  }

  // blink leds
  showStatus();
}

void readIncomingJson(String json)
{
  Serial.print("Raw JSON: ");
  Serial.println(json);

  StaticJsonDocument<256> doc;
  DeserializationError error = deserializeJson(doc, json);
  if (error)
  {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  const int numberClock = doc["clockNumber"];
  const String startTime = doc["startTime"].as<String>();
  const String name = doc["name"].as<String>();
  const String stopTime = doc["stopTime"].as<String>();

  if (numberClock)
  {
    Serial.print("setup ");
    Serial.println(numberClock);
    clocks[numberClock - 1].status = "setup";
  }
  if (startTime != "null")
  {
    Serial.print("start ");
    Serial.println(name);
    clocks[numberClock - 1].name = name;
    clocks[numberClock - 1].status = "start";


  }
  if (stopTime != "null")
  {
    Serial.print("stop ");
    Serial.println(name);
    clocks[numberClock - 1].status = "stop";
  }
}

void sendTypeJson()
{
  DynamicJsonDocument doc(256);
  doc["type"] = "arduino";

  String message;
  serializeJson(doc, message);

  client.beginMessage(TYPE_TEXT);
  client.print(message);
  client.endMessage();

  Serial.print("sending: ");
  Serial.println(message);
}

void showStatus()
{
  for (int i = 0; i < numClocks; i++)
  {

    //available
    if (clocks[i].status == "available")
    {
      // digitalWrite(clocks[i].pinLed, LOW);

      int interval = 1000;
      int stepperInterval = 6000;
      clocks[i].stepper->setSpeed(stepsPerRevolution / 60.0);
      clocks[i].stepper->runSpeed();

      if (millis() - clocks[i].lastSend > interval)
      {
        clocks[i].lightOn = !clocks[i].lightOn;
        digitalWrite(clocks[i].pinLed, clocks[i].lightOn);
        clocks[i].lastSend = millis();
      }
    }

    //start
    else if (clocks[i].status == "start")
    {
      int interval = 500;
      if (millis() - clocks[i].lastSend > interval)
      {
        clocks[i].lightOn = !clocks[i].lightOn;
        digitalWrite(clocks[i].pinLed, clocks[i].lightOn);
        clocks[i].lastSend = millis();
      }
    }

    else if (clocks[i].status == "setup")
    {
      digitalWrite(clocks[i].pinLed, HIGH);
    }

    else if (clocks[i].status == "play")
    {
      int interval = 1000;
      if (millis() - clocks[i].lastSend > interval)
      {
        clocks[i].lightOn = !clocks[i].lightOn;
        digitalWrite(clocks[i].pinLed, clocks[i].lightOn);
        clocks[i].lastSend = millis();
        clocks[i].stepper->setSpeed(stepsPerRevolution);
        clocks[i].stepper->runSpeed();
      }
    }
  }
}
