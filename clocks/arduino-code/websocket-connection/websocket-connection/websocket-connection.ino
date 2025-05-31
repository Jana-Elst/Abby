/*--- pin setup ---*/
/*--- pin setup ---*/
/*
Red led: D2
Green led: D3
Yellow led: D4
*/

#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h> // use this for MKR1010 and Nano 33 IoT
#include "arduino_secrets.h"

// global variables
bool connectionMade = false;

// clock
struct Clock
{
  int number;
  int pin;
  String status;
  String name;
  long lastSend;
  bool lightOn;
};

Clock clocks[] = {
    {1, 2, "available", "", 0, false},
    {2, 3, "available", "", 0, false},
    {3, 4, "available", "", 0, false}
    };

// Get the number of clocks
const int numClocks = sizeof(clocks) / sizeof(clocks[0]);

/*---Connection with socket ---*/
// local websocket setup
WiFiClient wifi;
char serverAddress[] = "192.168.129.2"; /* <-- change this of the network changes */
int port = 3000;                        /* server port */
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
    pinMode(clocks[i].pin, OUTPUT);
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

  //blink leds
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

  const int numberClock = doc["number"];
  const char *status = doc["message"]["status"]; // Use const char*

  clocks[numberClock - 1].status = status;

  // read name if status = start
  if (status == "start")
  {
    clocks[numberClock - 1].name = doc["message"]["name"].as<String>();
    Serial.println(doc["message"]["name"].as<String>());
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

    if (clocks[i].status == "available")
    {
      digitalWrite(clocks[i].pin, LOW);
    }

    else if (clocks[i].status == "start")
    {
      int interval = 500;
      if (millis() - clocks[i].lastSend > interval)
      {
        clocks[i].lightOn = !clocks[i].lightOn;
        digitalWrite(clocks[i].pin, clocks[i].lightOn);
        clocks[i].lastSend = millis();
      }
    }

    else if (clocks[i].status == "setup")
    {
      digitalWrite(clocks[i].pin, HIGH);
    }

    else if (clocks[i].status == "play")
    {
      int interval = 1000;
      if (millis() - clocks[i].lastSend > interval)
      {
        clocks[i].lightOn = !clocks[i].lightOn;
        digitalWrite(clocks[i].pin, clocks[i].lightOn);
        clocks[i].lastSend = millis();
      }
    }
  }
}
