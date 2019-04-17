#include <CMDWifi.h>
#include <Servo.h> 

Servo motor1;
CMDWifi wifi;

// CHANGE THESE SETTINGS
char ssid[] = "AvansWlan"; // your network SSID (name)
char pass[] = ""; // your network password, leave empty "" for no password
char server[] = "cmd.camp"; // the url of the webserver to connect to
int port = 12345; // the port on the webserver (80 is default)
char sendKey[] = "ZM5hJfzp"; // the key you will change on the server
char getKey[] = "7JrpHFhd"; // the key you want to read from the server

void setup() {
  // Don't forget to set OUTPUT or INPUT on the right ports
  pinMode(3, OUTPUT);
  motor1.attach(6);

  // initialize the connection to the server
  wifi.connect(ssid, pass, server, port);
}

void loop() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);

  // connect to the server, send the sensorValue to the sendKey
  // and read from the getKey. Here be magic.
  int response = wifi.sendGet(sendKey, sensorValue, getKey);

  // only do this part if the response is a real number
  if (response >= 0) {
    // print the response (for debugging purposes only)
    Serial.print("Sensor (send): ");
    Serial.print(sensorValue);
    Serial.print("\tOntvangen (get): ");
    Serial.println(response);

    // do something with response
    if (response ==1) {
  motor1.write(180);
   delay (300);
     motor1.write(0);
   delay (300);
     motor1.write(90);


       return;
       
    } else {
  motor1.write(90);
    }
  }

  // wait for a short time
  delay(100);
}
