/**
 * @file main.cpp
 * @author Brice Copy
 * @brief Microsquad client for Microbit V1
 * @date 2023-02-11
 */
#include "MicroBit.h"
// #include <chrono>
// #include <unordered_map>
// #include <sstream>

MicroBit    uBit;

// Radio message buffer
char message_buffer[256];

struct LineProtocolRecord {
    char* measurement;        // Name of the measurement
    uint16_t num_tags;        // Number of tags associated with the measurement
    char* tags;               // Tags associated with the measurement
    uint16_t num_fields;      // Number of field key-value pairs of the measurement
    char* fields;             // Field key-value pairs of the measurement
    uint64_t timestamp;       // Timestamp of the measurement in nanoseconds
};



void lp_parse(const char* input, LineProtocolRecord& output) {
    // Parse the input string and extract the measurement, tags, fields, and timestamp
    char measurement[256];
    char tags[1024];
    char fields[1024];
    uint64_t timestamp;
    int num_scanned = sscanf(input, "%255[^,],%1023[^ ] %1023[^ ] %lu", measurement, tags, fields, &timestamp);
    if (num_scanned != 4) {
        // If parsing fails, set all output fields to NULL or 0
        output.measurement = NULL;
        output.tags = NULL;
        output.fields = NULL;
        output.num_tags = 0;
        output.num_fields = 0;
        output.timestamp = 0;
        return;
    }

    // Copy the measurement, tags, and fields to dynamically allocated memory
    output.measurement = new char[strlen(measurement) + 1];
    strcpy(output.measurement, measurement);
    output.tags = new char[strlen(tags) + 1];
    strcpy(output.tags, tags);
    output.fields = new char[strlen(fields) + 1];
    strcpy(output.fields, fields);

    // Count the number of tags and fields by counting the number of commas
    output.num_tags = 0;
    output.num_fields = 0;
    for (char* c = tags; *c != '\0'; c++) {
        if (*c == ',') {
            output.num_tags++;
        }
    }
    for (char* c = fields; *c != '\0'; c++) {
        if (*c == ',') {
            output.num_fields++;
        }
    }

    // Add 1 to the counts to account for the last tag or field (which does not have a comma after it)
    output.num_tags++;
    output.num_fields++;

    // Convert the timestamp from nanoseconds to microseconds
    output.timestamp = timestamp / 1000;
}

char* lp_get_tag(LineProtocolRecord& record, const char* tag_name) {
    // Find the position of the field name in the fields string
    char* tag_pos = strstr(record.tags, tag_name);
    
    if (tag_pos == NULL) {
        // Tag name not found
        return NULL;
    }
    
    // Check if the next character after the tag name is the equals sign
    if (*(tag_pos + strlen(tag_name)) != '=') {
        // Tag name is part of a tag value
        return NULL;
    }
    
    // Find the position of the field value after the equals sign
    char* value_pos = tag_pos + strlen(tag_name) + 1;
    
    // Find the position of the next comma or the end of the fields string
    char* next_pos = strchr(value_pos, ',');
    if (next_pos == NULL) {
        next_pos = record.tags + strlen(record.tags);
    }
    
    // Allocate memory for the tag value and copy it from the tags string
    char* value = new char[next_pos - value_pos + 1];
    strncpy(value, value_pos, next_pos - value_pos);
    value[next_pos - value_pos] = '\0';
    
    return value;
}

float lp_get_field(LineProtocolRecord& record, const char* field_name) {
    // Find the position of the field name in the fields string
    char* field_pos = strstr(record.fields, field_name);
    
    if (field_pos == NULL) {
        // Field name not found
        return NAN;
    }
    
    // Find the position of the field value after the field name
    char* value_pos = strchr(field_pos, '=') + 1;
    
    // Find the position of the next comma or the end of the fields string
    char* next_pos = strchr(value_pos, ',');
    if (next_pos == NULL) {
        next_pos = record.fields + strlen(record.fields);
    }
    
    // Allocate memory for the field value and copy it from the fields string
    char* value = new char[next_pos - value_pos + 1];
    strncpy(value, value_pos, next_pos - value_pos);
    value[next_pos - value_pos] = '\0';
    
    // Convert the value to a float and return it
    float field_value = atof(value);
    
    delete[] value;
    
    return field_value;
}

// Event handler for incoming radio messages
void onRadioDatagramReceived(MicroBitEvent) {
    // Receive the radio message
    uBit.radio.datagram.recv(message_buffer, sizeof(message_buffer));
    
    // Parse the message into a LineProtocolRecord
    record = parseLineProtocolRecord(message_buffer);
    
    // Signal to the main loop that a new message has been received
    new_message_received = true;
}

// int main() {
//     // Initialize the MicroBit
//     uBit.init();
    
//     // Enable the radio
//     uBit.radio.enable();
    
//     // Register the event handler for incoming radio messages
//     uBit.messageBus.listen(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, onRadioDatagramReceived);
    
    
//     // We should never get here, but just in case...
//     return 0;
// }

int main()
{
    // Initialise the micro:bit runtime.
    uBit.init();
    uBit.radio.enable();
    uBit.messageBus.listen(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, onRadioDatagramReceived);
    
    while (1) {
        // Check if a new message has been received
        if (new_message_received) {
            // Print the values of the fields in the record
            // printFields(record);
            
            // Reset the flag
            new_message_received = false;
        }
        
        // Yield to other fibers
        fiber_sleep(1);
    }

//      struct LineProtocolRecord lpr;
//      lp_parse("VOTE,option1=A,option2=B index=0 1465839830100400200", lpr);
// // 
//     ManagedString meas("Measure :");
//     ManagedString m(lpr.measurement);
//     meas = meas + m;
//     uBit.display.scroll(meas);
}


