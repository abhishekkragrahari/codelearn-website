---
title: Date and Time API
chapter: Advanced Topics
description: Work with dates, times, durations and formatting using java.time.
---
The `java.time` package (Java 8+) is the modern way to handle dates and times. Its classes are **immutable**: methods like `plusDays` return a new object instead of changing the old one.

| Class | Holds | Example |
| --- | --- | --- |
| `LocalDate` | a date | 2026-08-15 |
| `LocalTime` | a time of day | 09:30 |
| `LocalDateTime` | date and time | 2026-08-15T09:30 |
| `ZonedDateTime` | date, time and time zone | 2026-08-15T09:30+05:30[Asia/Kolkata] |
| `Duration` / `Period` | an amount of time | 2 hours / 3 months |

`LocalDate.now()` gives today's date. The examples below use fixed dates so their output is always the same.

## Creating and changing dates

```java
import java.time.DayOfWeek;
import java.time.LocalDate;

public class Main {
    public static void main(String[] args) {
        LocalDate exam = LocalDate.of(2026, 3, 14);
        System.out.println(exam);
        System.out.println(exam.getDayOfWeek());
        System.out.println(exam.plusDays(30));
        System.out.println(exam.minusMonths(2));
        System.out.println(exam.isLeapYear());
        System.out.println(exam.lengthOfMonth());
        System.out.println(exam.getDayOfWeek() == DayOfWeek.SATURDAY);
    }
}
```
```output
2026-03-14
SATURDAY
2026-04-13
2026-01-14
false
31
true
```

## Comparing dates and measuring gaps

```java
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.ChronoUnit;

public class Main {
    public static void main(String[] args) {
        LocalDate birthday = LocalDate.of(2004, 9, 21);
        LocalDate today = LocalDate.of(2026, 10, 25);

        Period age = Period.between(birthday, today);
        System.out.println(age.getYears() + " years, " + age.getMonths() + " months, " + age.getDays() + " days");

        long days = ChronoUnit.DAYS.between(birthday, today);
        System.out.println(days + " days old");

        LocalDate deadline = LocalDate.of(2026, 11, 1);
        System.out.println(today.isBefore(deadline) + ", " + ChronoUnit.DAYS.between(today, deadline) + " days left");
    }
}
```
```output
22 years, 1 months, 4 days
8069 days old
true, 7 days left
```

## Times and durations

```java
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Main {
    public static void main(String[] args) {
        LocalTime start = LocalTime.of(9, 30);
        LocalTime end = LocalTime.of(17, 15);
        Duration shift = Duration.between(start, end);
        System.out.println(shift.toHours() + "h " + shift.toMinutesPart() + "m");

        LocalDateTime departure = LocalDateTime.of(2026, 12, 31, 22, 45);
        LocalDateTime arrival = departure.plusHours(3).plusMinutes(20);
        System.out.println(arrival);
        System.out.println(arrival.getYear());
    }
}
```
```output
7h 45m
2027-01-01T02:05
2027
```

## Formatting and parsing

`DateTimeFormatter` converts between dates and text using a pattern: `dd` day, `MM` month number, `MMM` short month name, `yyyy` year, `HH` hour (24h), `hh` hour (12h), `mm` minutes, `a` AM/PM.

```java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        LocalDateTime meeting = LocalDateTime.of(2026, 8, 15, 14, 5);

        DateTimeFormatter indian = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter friendly = DateTimeFormatter.ofPattern("EEE, d MMM yyyy 'at' hh:mm a", Locale.ENGLISH);

        System.out.println(meeting.format(indian));
        System.out.println(meeting.format(friendly));

        LocalDate parsed = LocalDate.parse("26/01/2027", indian);
        System.out.println(parsed + " is a " + parsed.getDayOfWeek());
    }
}
```
```output
15/08/2026
Sat, 15 Aug 2026 at 02:05 PM
2027-01-26 is a TUESDAY
```

> **Tip:** Avoid the old `java.util.Date` and `Calendar` classes in new code. They are mutable, confusing (months start at 0) and not thread safe; `java.time` fixes all of that.
