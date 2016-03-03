import org.junit.*;
import com.google.gson.Gson;

public class TestPerson {
    @Test
    public void testGsonOutput() {
        Gson gson = new Gson();
        Assert.assertNotSame("Should not be the same string.",
                gson.toJson(new Person("Fred Flintstone", 42, "Married")),
                "hello");
    }

    @Test
    public void testGsonOutput2() {
        Gson gson = new Gson();
        Assert.assertEquals("Should be the same string.",
                gson.toJson(new Person("Betty Rubble", 42, "Married")),
                "{\"name\":\"Betty Rubble\",\"age\":42,\"maritalStatus\":\"Married\"}");
    }

    @Test
    public void testGetters() {
        String name = "John Doe", maritalStatus = "Single";
        int age = 100;
        Person person = new Person(name, age, maritalStatus);
        Assert.assertEquals("Values don't match!", person.getName(), name);
        Assert.assertEquals("Values don't match!", person.getAge(), age);
        Assert.assertEquals("Values don't match!", person.getMaritalStatus(), maritalStatus);
    }
}