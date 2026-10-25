---
title: Your First Python Program
chapter: Getting Started
description: What Python is, how to install it, and how to make the computer say hello.
---
Python is a general-purpose programming language that was designed to be easy to read. Its code uses plain words such as `if`, `for` and `return`, and it uses indentation (spaces at the start of a line) instead of curly braces to group code together. That is why many schools and universities choose it as a first language.

## Setting up Python

You can run Python in two common ways:

- **Install it locally.** Download the installer from python.org, run it, and tick the option that adds Python to your PATH. Then open a terminal and type `python --version` to check it worked.
- **Use an online editor.** If you cannot install software right now, any online Python editor is fine for these lessons.

> **Tip:** On macOS and Linux the command is often `python3` instead of `python`.

## Hello, world

The tradition in programming is to start by printing a greeting. Save this line in a file called `hello.py`:

```python
print("Hello, world!")
```
```output
Hello, world!
```

Run it from a terminal with `python hello.py`. The `print()` function writes whatever you put inside the brackets to the screen. Text in quotes is called a **string**.

## Printing more than one thing

`print()` can take several values separated by commas. It puts a space between them and moves to a new line at the end.

```python
print("Learning", "Python", "is", "fun")
print("2 + 3 =", 2 + 3)
print()  # an empty print gives a blank line
print("Done!")
```
```output
Learning Python is fun
2 + 3 = 5

Done!
```

Anything after a `#` is a **comment**. Python ignores comments, so you can use them to leave notes for yourself and for other readers.

## What you learned

- Python programs are plain text files ending in `.py`.
- `print()` shows values on the screen.
- `#` starts a comment.
