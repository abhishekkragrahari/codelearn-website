---
title: File Handling
chapter: Exceptions and Files
description: Read and write files with java.nio.file.Files, BufferedReader and try-with-resources.
---
Java has two file APIs. The modern `java.nio.file` package (`Path` and `Files`) is the easiest for most tasks. The older `java.io` classes (`FileReader`, `BufferedReader`, `FileWriter`) are still common, especially for reading large files line by line.

File operations can fail (missing file, no permission, full disk), so they throw `IOException`, a **checked** exception. You must catch it or declare it with `throws`.

## Writing and reading a whole file

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

public class Main {
    public static void main(String[] args) throws IOException {
        Path file = Path.of("notes.txt");

        Files.writeString(file, "first line\nsecond line\n");
        Files.write(file, List.of("third line"), java.nio.file.StandardOpenOption.APPEND);

        String all = Files.readString(file);
        System.out.print(all);

        List<String> lines = Files.readAllLines(file);
        System.out.println(lines.size() + " lines, last: " + lines.get(lines.size() - 1));
        System.out.println(Files.exists(file) + " " + Files.size(file) + " bytes");
    }
}
```
```output
first line
second line
third line
3 lines, last: third line
true 34 bytes
```

## try-with-resources

Readers and writers hold an open file handle that must be closed. A **try-with-resources** statement closes them automatically at the end of the block, even if an exception is thrown.

```flowchart
caption: try-with-resources always closes the resource
start: Open file in try ( ... )
step: Run the try block
if: Exception thrown?
  yes:
    step: Close the file
    step: Run matching catch
  no:
    step: Close the file
end: Continue after try
```

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Main {
    public static void main(String[] args) {
        try (BufferedWriter out = new BufferedWriter(new FileWriter("scores.csv"))) {
            out.write("Asha,91\n");
            out.write("Ravi,72\n");
            out.write("Meera,85\n");
        } catch (IOException e) {
            System.out.println("Could not write: " + e.getMessage());
        }

        int total = 0, count = 0;
        try (BufferedReader in = new BufferedReader(new FileReader("scores.csv"))) {
            String line;
            while ((line = in.readLine()) != null) {
                String[] parts = line.split(",");
                System.out.println(parts[0] + " scored " + parts[1]);
                total += Integer.parseInt(parts[1]);
                count++;
            }
        } catch (IOException e) {
            System.out.println("Could not read: " + e.getMessage());
        }
        System.out.println("Average: " + (double) total / count);
    }
}
```
```output
Asha scored 91
Ravi scored 72
Meera scored 85
Average: 82.66666666666667
```

## Handling a missing file

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;

public class Main {
    public static void main(String[] args) {
        try {
            String text = Files.readString(Path.of("missing.txt"));
            System.out.println(text);
        } catch (NoSuchFileException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Other I/O problem: " + e.getMessage());
        }
    }
}
```
```output
File not found: missing.txt
```

## Working with folders

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) throws IOException {
        Path dir = Path.of("reports");
        Files.createDirectories(dir);
        Files.writeString(dir.resolve("jan.txt"), "January");
        Files.writeString(dir.resolve("feb.txt"), "February");

        try (Stream<Path> files = Files.list(dir)) {
            files.map(p -> p.getFileName().toString()).sorted().forEach(System.out::println);
        }
        System.out.println(dir.resolve("jan.txt"));
    }
}
```
```output
feb.txt
jan.txt
reports/jan.txt
```

> **Note:** Relative paths such as `"notes.txt"` are resolved from the folder you ran `java` in. The path separator prints as `\` on Windows.
