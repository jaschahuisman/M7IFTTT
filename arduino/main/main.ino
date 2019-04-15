#include <CMDWifi.h>
// Hoi ik ben eva en ik werk aan de arduino
CMDWifi wifi;

// configuratie
char ssid[] = "AvansWlan"; // je netwerk SSID (naam)
char pass[] = ""; // je netwerk wachtwoord, laat leeg "" als er geen wachtwoord is
char server[] = "cmd.camp"; // het url van de webserver 
int port = 12345; // de poort van de webserver
char sendKey[] = "xxxxx"; // de key waar je data naar stuurt
char getKey[] = "xxxxx"; // de key waar je data vandaan haalt
int actuator = 3; // de output pin naar je actuator

void setup() {
  // maak verbinding met de wifi
  pinMode(actuator, OUTPUT);
  // maak verbinding met de wifi
  wifi.connect(ssid, pass, server, port);
}

void loop() {
  // read the input on analog pin 0:
  int sensorValue = analogRead(A0);

  // maak verbinding, stuur sensorwaarde naar sendKey en lees getKey data uit
  int response = wifi.sendGet(sendKey, sensorValue, getKey);

  // doe iets met de ontvangen data
//  if (response >= 0) {
//    // doe niks
//    Serial.print("Sensor (send): ");
//    Serial.print(sensorValue);
//    Serial.print("\tOntvangen (get): ");
//    Serial.println(response);
//
//    if (response == 1) {
//      digitalWrite(actuator, HIGH);
//    } else {
//      digitalWrite(actuator, LOW);
//    }
//  }

  // eventjes wachten ivm overbelasting
  delay(100);
}
