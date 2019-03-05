import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.exc.UnrecognizedPropertyException;
import com.google.gson.Gson;

import java.io.IOException;

public class Main {

    public static class JacksonTestClass {

        private String stringValue;
        private int intValue;
        private boolean booleanValue;

        public JacksonTestClass() {
            super();
        }

        public String getStringValue() {
            return stringValue;
        }

        public int getIntValue() {
            return intValue;
        }

        public boolean isBooleanValue() {
            return booleanValue;
        }

        public void setStringValue(String stringValue) {
            this.stringValue = stringValue;
        }

        public void setIntValue(int intValue) {
            this.intValue = intValue;
        }

        public void setBooleanValue(boolean booleanValue) {
            this.booleanValue = booleanValue;
        }
    }

    public static JacksonTestClass lossyJacksonTest() throws IOException {
        String jsonAsString = "{\"stringValue\":\"a\"," +
                "\"intValue\":1," +
                "\"booleanValue\":true," +
                "\"booleanValue2\":true," +
                "\"stringValue2\":\"something\"}";
        System.out.println(jsonAsString);
        ObjectMapper mapperNoIgnore = new ObjectMapper();
        ObjectMapper mapper = new ObjectMapper();
        JacksonTestClass jacksonTestClass = null;
        try {
            jacksonTestClass = mapperNoIgnore.readValue(
                    jsonAsString, JacksonTestClass.class
            );
        } catch (UnrecognizedPropertyException e) {
            System.err.println("Ignoring 1 or more unrecognized properties absent from contract: " + e.getPropertyName());
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            jacksonTestClass = mapper.readValue(jsonAsString, JacksonTestClass.class);
        }
        return jacksonTestClass;
    }

    public static void gsonTest() {
        Gson gson = new Gson();
        System.out.println(gson.toJson(new Person("Fred Flintstone", 42, "Married")));
    }

    public static void main(String[] args) throws IOException {
        //gsonTest();
        System.out.println(lossyJacksonTest().toString());

    }
}
