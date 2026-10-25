---
title: Sorting with Comparable and Comparator
chapter: Collections and Generics
description: Define a natural order for your classes and sort by any field you like.
---
Java can sort numbers and strings out of the box. To sort your own objects, you tell Java how to compare two of them. There are two ways:

- **`Comparable`**: the class itself defines its one **natural order** by implementing `compareTo`.
- **`Comparator`**: a separate object defines **any** order, and you can have as many as you like.

A comparison returns a negative number if the first item comes first, zero if they are equal, and a positive number if the second comes first.

## Comparable: the natural order

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Student> list = new ArrayList<>(List.of(
            new Student("Ravi", 72), new Student("Asha", 91), new Student("Meera", 85)));
        Collections.sort(list);          // uses compareTo
        System.out.println(list);
    }
}

class Student implements Comparable<Student> {
    final String name;
    final int marks;
    Student(String name, int marks) { this.name = name; this.marks = marks; }

    @Override
    public int compareTo(Student other) {
        return this.name.compareTo(other.name);   // alphabetical by name
    }

    public String toString() { return name + ":" + marks; }
}
```
```output
[Asha:91, Meera:85, Ravi:72]
```

## Comparator: any order you need

`Comparator.comparing` builds a comparator from a field. You can reverse it and chain tie-breakers with `thenComparing`.

```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        List<Employee> staff = new ArrayList<>(List.of(
            new Employee("Kabir", "Sales", 52000),
            new Employee("Asha", "Tech", 90000),
            new Employee("Dev", "Tech", 75000),
            new Employee("Meera", "Sales", 52000)));

        staff.sort(Comparator.comparing(Employee::salary));
        System.out.println(staff);

        staff.sort(Comparator.comparing(Employee::salary).reversed());
        System.out.println(staff);

        staff.sort(Comparator.comparing(Employee::dept).thenComparing(Employee::name));
        System.out.println(staff);
    }
}

record Employee(String name, String dept, int salary) {
    public String toString() { return name + "(" + dept + "," + salary + ")"; }
}
```
```output
[Kabir(Sales,52000), Meera(Sales,52000), Dev(Tech,75000), Asha(Tech,90000)]
[Asha(Tech,90000), Dev(Tech,75000), Kabir(Sales,52000), Meera(Sales,52000)]
[Kabir(Sales,52000), Meera(Sales,52000), Asha(Tech,90000), Dev(Tech,75000)]
```

`Employee::salary` is a **method reference**: shorthand for the lambda `e -> e.salary()`.

## Sorting arrays and strings

```java
import java.util.Arrays;
import java.util.Comparator;

public class Main {
    public static void main(String[] args) {
        String[] words = {"pineapple", "fig", "Banana", "apple"};

        Arrays.sort(words);
        System.out.println(Arrays.toString(words));      // capitals sort first

        Arrays.sort(words, String.CASE_INSENSITIVE_ORDER);
        System.out.println(Arrays.toString(words));

        Arrays.sort(words, Comparator.comparingInt(String::length).thenComparing(Comparator.naturalOrder()));
        System.out.println(Arrays.toString(words));

        Integer[] nums = {5, 1, 4};
        Arrays.sort(nums, Comparator.reverseOrder());
        System.out.println(Arrays.toString(nums));
    }
}
```
```output
[Banana, apple, fig, pineapple]
[apple, Banana, fig, pineapple]
[fig, apple, Banana, pineapple]
[5, 4, 1]
```

> **Warning:** Avoid writing comparators as `a - b` for large numbers: the subtraction can overflow and give the wrong sign. `Integer.compare(a, b)` or `Comparator.comparingInt` is always safe.
