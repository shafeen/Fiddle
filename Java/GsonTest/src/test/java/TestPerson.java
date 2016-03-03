import org.junit.*;
import com.google.gson.Gson;

public class TestPerson {
    @Test
    public void testJsonOutput() {
        Gson gson = new Gson();
        Assert.assertNotSame("Should not be the same string.",
                gson.toJson(new Person("Fred Flintstone", 42, "Married")),
                "hello");
    }

    @Test
    public void testJsonOutput2() {
        Gson gson = new Gson();
        Assert.assertEquals("Should be the same string.",
                gson.toJson(new Person("Betty Rubble", 42, "Married")),
                "{\"name\":\"Betty Rubble\",\"age\":42,\"maritalStatus\":\"Married\"}");
    }
}