---
title: Reading and Writing Files
chapter: Errors and Files
description: Save data to files and read it back with open() and the with statement.
---
Variables disappear when a program ends. To keep data, write it to a **file**. The built-in `open()` function gives you a file object, and the `with` statement makes sure the file is closed properly when you are done, even if an error happens.

## Writing a file

Mode `"w"` creates the file, or empties it if it already exists.

```python
with open("notes.txt", "w") as f:
    f.write("First line\n")
    f.write("Second line\n")

print("Saved!")
```
```output
Saved!
```

## Reading a file

Mode `"r"` (the default) opens a file for reading. `read()` gives you the whole content as one string. Looping over the file gives you one line at a time.

```python
with open("notes.txt", "w") as f:
    f.write("apple\nbanana\ncherry\n")

with open("notes.txt") as f:
    content = f.read()
print(repr(content))

with open("notes.txt") as f:
    for number, line in enumerate(f, start=1):
        print(number, line.strip())
```
```output
'apple\nbanana\ncherry\n'
1 apple
2 banana
3 cherry
```

`line.strip()` removes the newline character at the end of each line.

## Appending

Mode `"a"` adds to the end of a file without erasing what is already there.

```python
with open("log.txt", "w") as f:
    f.write("started\n")

for event in ["loaded data", "finished"]:
    with open("log.txt", "a") as f:
        f.write(event + "\n")

with open("log.txt") as f:
    print(f.read(), end="")
```
```output
started
loaded data
finished
```

## Missing files

Opening a file that does not exist for reading raises `FileNotFoundError`. Combine files with what you learned about exceptions:

```python
try:
    with open("does_not_exist.txt") as f:
        print(f.read())
except FileNotFoundError:
    print("File not found. Check the name and folder.")
```
```output
File not found. Check the name and folder.
```

> **Note:** Relative names like `"notes.txt"` are looked up in the folder you run the program from, not necessarily the folder where the `.py` file lives.
