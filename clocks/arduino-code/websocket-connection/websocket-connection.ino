/*--- pin setup ---*/
/*
Red led: D2
Green led: D3
Yellow led: D4
*/

#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>  // use this for MKR1010 and Nano 33 IoT
#include "arduino_secrets.h"

//global variables
int receivedNumber = 0;
int currentNumber = 0;
String receivedTitle = "";

bool led_red = false;
bool led_green = false;
bool led_yellow = false;

//pins
const int LED_RED = 2;
const int LED_GREEN = 3;
const int LED_YELLOW = 4;

//local websocket setup
WiFiClient wifi;
char serverAddress[] = "192.168.129.2";
int port = 3000;
char endpoint[] = "/";

// initialize the webSocket client
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);
// message sending interval, in ms:
int interval = 5000;
// last time a message was sent, in ms:
long lastSend = 0;

void setup() {
  Serial.begin(9600);
  if (!Serial) delay(3000);

  // connect to WIFi:
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to Network named: ");
    Serial.println(SECRET_SSID);
    // Connect to WPA/WPA2 network:
    WiFi.begin(SECRET_SSID, SECRET_PASS);
  }

  //print board info 
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());
  
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  
  client.begin(endpoint);
  
  sendTypeJson();

  pinMode(LED_RED, OUTPUT);
  pinMode(LED_GREEN, OUTPUT);
  pinMode(LED_YELLOW, OUTPUT);
}

void loop() {
   // if not connected to the socket server, try to connect:
  if (!client.connected()) {
    client.begin();
    delay(1000);
    Serial.println("attempting to connect to server");
    // skip the rest of the loop:
    return;
  }

  if (millis() - lastSend > interval) {
    // update the timestamp:
    sendTypeJson();
    lastSend = millis();
  }

  int messageSize = client.parseMessage();
  if (messageSize > 0) {
    String message = client.readString();
    readIncomingJson(message);
  }

  //toggle leds
    if (receivedNumber == 1) {
      Serial.println("red on");
      led_red = !led_red;
      digitalWrite(LED_RED, led_red);
      receivedNumber = 0;
    }

    if (receivedNumber == 3) {
      led_green = !led_green;
      digitalWrite(LED_GREEN, led_green);
      receivedNumber = 0;
    }

    if (receivedNumber == 2) {
      led_yellow = !led_yellow;
      digitalWrite(LED_YELLOW, led_yellow);
      receivedNumber = 0;
    }
}

void readIncomingJson(String json) {
    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, json);
    if (error)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(error.f_str());
      return;
    }

    receivedNumber = doc["number"];
    receivedTitle = doc["name"].as<String>();

    Serial.print("Received number: ");
    Serial.println(receivedNumber);
    Serial.print("Received title: ");
    Serial.println(receivedTitle);    
}

void sendTypeJson() {
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
