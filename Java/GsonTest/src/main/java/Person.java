public class Person {
    String name;
    int age;
    String maritalStatus;

    public Person(String name, int age, String maritalStatus) {
        this.name = name;
        this.age = age;
        this.maritalStatus = maritalStatus;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getMaritalStatus() {
        return maritalStatus;
    }
}
