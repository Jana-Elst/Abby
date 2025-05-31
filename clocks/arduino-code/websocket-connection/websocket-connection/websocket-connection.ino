/*--- pin setup ---*/
/*
*/

#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>  // use this for MKR1010 and Nano 33 IoT
#include "arduino_secrets.h"

//global variables
bool connectionMade = false;
int receivedNumber;
String receivedMessage = "";

//pins

/*---Connection with socket ---*/
// local websocket setup
WiFiClient wifi;
char serverAddress[] = "192.168.129.2"; /* <-- change this of the network changes */
int port = 3000; /* server port */
char endpoint[] = "/";

// initialize the webSocket client
WebSocketClient client = WebSocketClient(wifi, serverAddress, port);


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

  if (!connectionMade) {
    sendTypeJson();
    connectionMade = true;
  }

  //read messages
  int messageSize = client.parseMessage();
  if (messageSize > 0) {
    String message = client.readString();
    readIncomingJson(message);
  }
}

void readIncomingJson(String json) {
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

    receivedNumber = doc["number"];
    Serial.print("Received number: ");
    Serial.println(receivedNumber);

    const char* status = doc["hello"]["status"]; // Use const char*
    Serial.print("Received status: ");
    Serial.println(status);  
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
