import com.google.gson.Gson;

public class Main {

    public static void gsonTest() {
        Gson gson = new Gson();
        System.out.println(gson.toJson(new Person("Fred Flintstone", 42, "Married")));
    }

    public static void main(String[] args) {
        gsonTest();
    }
}
