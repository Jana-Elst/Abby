/*
  http://librarymanager/All#ArduinoHttpClient.h
  http://librarymanager/All#WiFiNINA.h  for Nano 33 IoT, MKR1010
*/

#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>  // use this for MKR1010 and Nano 33 IoT
#include "arduino_secrets.h"
#include <ArduinoJson.h>

// settings for a local test with websockets on your own server:
// set up a WiFi client (not using SSL):
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
    // read sensor:
    //int sensor = analogRead(A0);
    String message = "{\"sensor\": \"HEY\"}";
    // send the message:
    
    client.beginMessage(TYPE_TEXT);
    client.print(message);
    client.endMessage();
    
    Serial.print("sending: ");
    Serial.println(message);
    // update the timestamp:
    lastSend = millis();
  }
  
  // check if a message is available to be received
  int messageSize = client.parseMessage();
  if (messageSize > 0) {
    Serial.print("Received a message:");
    Serial.println(client.readString());
  }
}