/*used arduino: Arduino nano IOT*/
/*--- pin setup ---*/
/*
steppermotor: 14, 15, 16, 17
switch: 20
ledmatrix: 18
ledstrip: 19
*/

//libraries
#include <ArduinoJson.h>
#include <ArduinoHttpClient.h>
#include <WiFiNINA.h>  // use this for MKR1010 and Nano 33 IoT
#include "arduino_secrets.h"
#include <WebSocketClient.h>
#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#include <Adafruit_NeoPixel.h>

/* ------ global variables ------*/
//internet connection
bool connectionMade = false;

//stepper motor
const int stepsPerRevolution = 2048;

// 60 seconds / (2048 * 8 millisteps) = ~3662.11 µs per millistep
const unsigned long stepIntervalStepper = 60000000 / (stepsPerRevolution * 2);  // ~29297 microseconds

int pole1[] = { 1, 1, 1, 0, 0, 0, 0, 0, 0 };
int pole2[] = { 0, 0, 1, 1, 1, 0, 0, 0, 0 };
int pole3[] = { 0, 0, 0, 0, 1, 1, 1, 0, 0 };
int pole4[] = { 0, 1, 0, 0, 0, 0, 1, 1, 0 };

/* ------ constructor ------*/
struct Clock {
  int clockNumber;
  String name;
  String status;

  //steppermotor
  int pinStepper1;
  int pinStepper2;
  int pinStepper3;
  int pinStepper4;
  int poleStep;
  unsigned long stepperPrevmillis;
  bool initialStateStepper;
  int stepCountStepper;
  bool stepperStart;
  bool toZero;

  //matrix
  int pinMatrix;
  Adafruit_NeoMatrix *matrix;
  int textX;
  int matrixPrevmillis;

  //neopixel
  int pinNeoPixel;
  Adafruit_NeoPixel *neoPixel;
  int ledBrightness;
  int ledOn;
  unsigned long ledPrevMillis;
  bool ledFadeOut;

  //switch
  int pinSwitch;
};

Clock clocks[] = {
  { 1, "", "available", 14, 15, 16, 17, 0, 0, false, 0, false, false, 18, nullptr, 0, 0, 19, nullptr, 50, true, 0, false, 20 }
};

// Get the number of clocks
const int numClocks = sizeof(clocks) / sizeof(clocks[0]);

/* ------ Connection with socket ------*/
// local websocket setup
WiFiClient wifi;
char serverAddress[] = "172.30.248.94"; /* <-- change this of the network changes */
int port = 3000;                        /* server port */
char endpoint[] = "/";

WebSocketClient client = WebSocketClient(wifi, serverAddress, port);

void setup() {
  Serial.begin(9600);
  if (!Serial)
    delay(3000);

  /* ------ WIFI CONNECTION SETUP ------*/
  // connect to WIFi:
  while (WiFi.status() != WL_CONNECTED) {
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

  /* ------ ELECTRONICA SETUP ------*/
  for (int i = 0; i < numClocks; i++) {
    //setup stepper motor
    pinMode(clocks[i].pinStepper1, OUTPUT);
    pinMode(clocks[i].pinStepper2, OUTPUT);
    pinMode(clocks[i].pinStepper3, OUTPUT);
    pinMode(clocks[i].pinStepper4, OUTPUT);

    //setup switch
    pinMode(clocks[i].pinSwitch, INPUT_PULLUP);

    //create a matrix
    clocks[i].matrix = new Adafruit_NeoMatrix(32, 8, clocks[i].pinMatrix,
                                              NEO_MATRIX_BOTTOM + NEO_MATRIX_RIGHT + NEO_MATRIX_COLUMNS + NEO_MATRIX_ZIGZAG,
                                              NEO_GRB + NEO_KHZ800);

    clocks[i].matrix->begin();
    clocks[i].matrix->setTextWrap(false);
    clocks[i].matrix->setBrightness(80);

    clocks[i].matrix->setTextColor(clocks[i].matrix->Color(255, 255, 255));
    clocks[i].textX = clocks[i].matrix->width();
    clocks[i].matrix->clear();


    //create neopixel
    clocks[i].neoPixel = new Adafruit_NeoPixel(30, clocks[i].pinNeoPixel, NEO_GRB + NEO_KHZ800);
    clocks[i].neoPixel->begin();
    clocks[i].neoPixel->clear();
    clocks[i].neoPixel->fill(clocks[i].neoPixel->Color(0, 0, 0));
    clocks[i].neoPixel->show();
  }
}

/* ------ THINGS FOR THE STEPPER ------*/
void startStepper(Clock &clock) {
  unsigned long currentmicros = micros();

  if (currentmicros - clock.stepperPrevmillis >= stepIntervalStepper && clock.stepperStart == true) {
    clock.stepperPrevmillis = currentmicros;
    clock.poleStep = (clock.poleStep + 1) % 8;
    driveStepper(clock, clock.poleStep);
    clock.stepCountStepper++;
  }

  if (clock.stepCountStepper >= (stepsPerRevolution * 2)) {
    Serial.println("stop stop");
    clock.stepperStart = false;            // Stop motor
    digitalWrite(clock.pinStepper1, LOW);  // Release coils
    digitalWrite(clock.pinStepper2, LOW);
    digitalWrite(clock.pinStepper3, LOW);
    digitalWrite(clock.pinStepper4, LOW);
  }
}

void driveStepper(Clock &clock, int c) {
  digitalWrite(clock.pinStepper1, pole1[c]);
  digitalWrite(clock.pinStepper2, pole2[c]);
  digitalWrite(clock.pinStepper3, pole3[c]);
  digitalWrite(clock.pinStepper4, pole4[c]);
}

void setInitialState(Clock &clock) {
  Serial.print("SETUP ");

  const unsigned long stepInterval = 5;  // Stepper interval (ms)
  bool switchState = digitalRead(clock.pinSwitch);

  Serial.println("turning");

  while (switchState == LOW) {
    unsigned long currentMillis = millis();
    switchState = digitalRead(clock.pinSwitch);

    // Stepper logic
    if (currentMillis - clock.stepperPrevmillis >= stepInterval) {
      clock.stepperPrevmillis = currentMillis;
      driveStepper(clock, clock.poleStep);
      clock.poleStep--;
      if (clock.poleStep < 0) clock.poleStep = 7;
      clock.stepCountStepper = 0;
    }
  }

  Serial.println("SETUP IS READY");
  clock.stepperPrevmillis = 0;
  clock.initialStateStepper = true;
  clock.toZero = true;
  Serial.println("Switch detected. Initial position set.");

  clock.stepperStart = true;
}

void returnToZero(Clock &clock) {
  const int stepperBackInterval = 2;
  Serial.println("START TO ZERO");

  while (clock.stepCountStepper > (0)) {
    unsigned long currentMillis = millis();
    if (currentMillis - clock.stepperPrevmillis >= stepperBackInterval) {
      Serial.println("if state wordt uitgevoerd...");
      clock.stepperPrevmillis = currentMillis;
      driveStepper(clock, clock.poleStep);
      clock.poleStep--;
      if (clock.poleStep < 0) clock.poleStep = 7;
      clock.stepCountStepper--;
    }
  }

  Serial.println("stop stop");
  clock.stepperStart = false;            // Stop motor
  digitalWrite(clock.pinStepper1, LOW);  // Release coils
  digitalWrite(clock.pinStepper2, LOW);
  digitalWrite(clock.pinStepper3, LOW);
  digitalWrite(clock.pinStepper4, LOW);
  clock.toZero = true;
  clock.stepperStart = true;
  Serial.println('IK BEN KLAAR');
}

/* ------ BLINKING FOR THE NEOPIXEL ------*/
void fadeBlink(Clock &clock) {
  Serial.println("blink blink");

  static bool fadingUp = true;
  static unsigned long previousMillis = 0;
  const int interval = 10;  // smaller interval for smoother fade

  unsigned long currentMillis = millis();
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    // Adjust brightness
    if (fadingUp) {
      if (clock.ledBrightness < 255) {
        clock.ledBrightness++;
      } else {
        fadingUp = false;  // start fading down
      }
    } else {
      if (clock.ledBrightness > 0) {
        clock.ledBrightness--;
      } else {
        fadingUp = true;  // start fading up
        clock.ledOn++;
      }
    }

    // Calculate warm RGB values
    uint8_t warmR = clock.ledBrightness;
    uint8_t warmG = clock.ledBrightness * 0.6;
    uint8_t warmB = clock.ledBrightness * 0.16;

    // Apply color to NeoPixel
    clock.neoPixel->fill(clock.neoPixel->Color(warmR, warmG, warmB));
    clock.neoPixel->show();
  }
}

/* ------ LOGIC FOR SHOWING THE CORRECT THINGS AT THE RIGHT MOMENTS ------*/
void changeStatusClock(int numberClock, String startTime, String name, String stopTime) {
  if (numberClock && startTime == "null") {
    Serial.print("setup clock ");
    Serial.println(numberClock);
    clocks[numberClock - 1].status = "setup";
  }

  if (startTime != "null") {
    Serial.print("start ");
    Serial.println(name);
    clocks[numberClock - 1].name = name;
    clocks[numberClock - 1].status = "start";
  }

  if (stopTime != "null") {
    Serial.print("stop ");
    Serial.println(name);
    clocks[numberClock - 1].status = "stop";
  }
}

void showCorrectStatus() {
  for (int i = 0; i < numClocks; i++) {

    //clock available
    if (clocks[i].status == "available") {
    }

    //setup
    else if (clocks[i].status == "setup") {
      //ledstrip
      if (clocks[i].ledOn < 3) {
        fadeBlink(clocks[i]);
      } else {
        // Keep the LED circle turned on now
        uint8_t warmR = 255;
        uint8_t warmG = 255 * 0.6;   // = 153
        uint8_t warmB = 255 * 0.16;  // = 40

        clocks[i].neoPixel->fill(clocks[i].neoPixel->Color(warmR, warmG, warmB));
        clocks[i].neoPixel->show();
      }

      //reset stepper
      if (clocks[i].stepCountStepper > 0) {
        returnToZero(clocks[i]);
      };
    }

    //start
    else if (clocks[i].status == "start") {
      //start stepper
      clocks[i].stepperStart = true;
      if (clocks[i].toZero) {
        startStepper(clocks[i]);
      }
      //start ledmatrix
      unsigned long currentmillis = millis();
      const unsigned long interval = 120;  //1sec * 60sec = 1 min

      if (currentmillis - clocks[i].matrixPrevmillis >= interval) {
        clocks[i].matrixPrevmillis = currentmillis;

        clocks[i].matrix->fillScreen(0);
        clocks[i].matrix->setCursor(clocks[i].textX, 0);
        clocks[i].matrix->print(clocks[i].name);
        clocks[i].matrix->show();

        //and move text
        clocks[i].textX--;
        // andeset to right edge after text scrolls off left
        int textWidth = 6 * clocks[i].name.length();
        // int textWidth = 6 * strlen(clocks[i].name); // 6 pixels per char (5 wide + 1 space)
        if (clocks[i].textX < -textWidth) {
          clocks[i].textX = clocks[i].matrix->width();
        }

        //ledstrip
        //ledstrip
        // LED fade out logic
        clocks[i].neoPixel->clear();
        clocks[i].neoPixel->fill(clocks[i].neoPixel->Color(0, 0, 0));
        clocks[i].neoPixel->show();
      }
    }

    //stop
    else if (clocks[i].status == "stop") {
      //intialStatus back to false
      clocks[i].toZero = false;

      //stepper should stop
      clocks[i].stepperStart = false;

      //ledmatrix should stop
      clocks[i].matrixPrevmillis = 0;
      clocks[i].matrix->fillScreen(0);
      clocks[i].matrix->show();
    }
  }
}

/* ------ READING & SENDING JSON MESSAGES ------*/
//send JSON messages
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

//read
void readIncomingJson(String json) {
  Serial.print("Raw JSON: ");
  Serial.println(json);

  StaticJsonDocument<256> doc;
  DeserializationError error = deserializeJson(doc, json);
  if (error) {
    Serial.print(F("deserializeJson() failed: "));
    Serial.println(error.f_str());
    return;
  }

  //Decode message
  const int numberClock = doc["clockNumber"];
  const String startTime = doc["startTime"].as<String>();
  const String name = doc["name"].as<String>();
  const String stopTime = doc["stopTime"].as<String>();

  changeStatusClock(numberClock, startTime, name, stopTime);
}

/* ------ LET'S START! ------*/
void loop() {
  /* ------ CHECK CONNECTION WITH SERVER------*/
  // if not connected to the socket server, try to connect:
  if (!client.connected()) {
    client.begin();
    delay(1000);
    Serial.println("attempting to connect to server");
    // skip the rest of the loop:
    return;
  }

  for (int i = 0; i < numClocks; i++) {
    if (!clocks[i].initialStateStepper) {
      Serial.print("initail state");
      setInitialState(clocks[i]);
    };

    if (!connectionMade) {
      sendTypeJson();
      connectionMade = true;
    }

    // read messages
    int messageSize = client.parseMessage();
    if (messageSize > 0) {
      String message = client.readString();
      readIncomingJson(message);
    }

    showCorrectStatus();
  }
}
