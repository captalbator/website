---
title: "I Don't Like Language Benchmarks"
date: 2025-09-06
tags: ["programming", "rant"]
---

Last week my computer science professor showed the class some language benchmarks to showcase the speeds of different languages.
The benchmark in question was a program that counts primes up to 100 000.
I understand he did it to teach the class that different languages are slower than others, but it made me cringe a bit, for a few reasons.

## 1. They're misleading

I don't think the speed of a language in counting primes is an efficient measurement of performance.
The benchmark program is just too simple to showcase the speed of a language properly.
In a bigger program, performance is more likely to be impacted by things like memory allocation/deallocation and memory layouts.
But these problems don't really come up in such a small program, misleading the reader into thinking a language is faster, when it isn't really.

Furthermore, the difference in speed between compiled languages was very small.
This tells me that they're likely to have very similar performances in real programs!

## 2. It doesn't matter

I don't think you should pick a language strictly for its speed.
You should pick the language that **fits the needs of the problem at hand.**

For example, I wouldn't switch to C for automating my terminal over bash or another scripting language just because it's faster.
I'm sure there are people who do, and all the power to them.
But personally I prefer using languages that are specifically made to automate commands.

To me, what's more important is a language's semantics.
Hows the standard library?
Does the language force me to do things I don't want to do?
Hows the tooling?
Etc, etc.

## 3. Most performance sinks are due to the programmer

You can write slow code in any language, without it being the fault of the language itself.
I've done it before^[And I'll do it again!], and completely accidentally.

Let's say I write a game in C that allocates and frees lots of memory every frame, and I write the same game in Lua but I don't do that.
I guarantee the C program will be slower.

## 4. It's unlikely that your code for a language you don't know is efficient

My professor's Rust program did terribly in the benchmarks.
In fact, it was almost two times slower than the C++ version.
Now, I'm not a very big fan of Rust (because iterating in Rust sucks!), but I know that well written Rust code is very fast.
I've used plenty of Rust programs that performed much, much better than equivalent programs written in C++.
So I think it's much more likely that the program wasn't using the full extent of Rust's capabilities because it's such a different language from C++ (what with the borrow checker and all).

## 5. Different compilers and architectures will give you different results

My professor's computer recorded ~0.3 seconds on the C++ benchmark with GCC.
However, with clang he got ~0.6 seconds!
On my M2 MacBook Air, I get ~0.3 seconds on both compilers!

The Odin benchmark^[I sent over an equivalent program in Odin because I like Odin and I wanted him to see it. This is not an endorsement of language benchmarks.] ran in ~0.4 seconds on my machine, but on his he got over 1 second (I'm not entirely sure why, that seems extremely high to me).

This can be explained by many factors, but my point is that it's hard to quantize how performant these languages are in real uses.
Each computer is different, and each language will perform differently on them.

## 6. The majority of the class are novices

An experienced programmer will understand that these benchmarks are abstract and don't really showcase *why* you'd use one language over the other.
However, a novice is likely to look at the benchmarks and think "I should use the fastest language, because faster is better!"

Out of all the benchmarks our professor did, Java (seemingly to his surprise) came out on top.
Java, compiled with AOT, was faster than C++.

I'm not here to shit on Java or anything, but as a staunch critic of the OOP paradigm, I'd rather not have new programmers think it's faster.
It's not.
In this specific case it was because the benchmark doesn't even use any Java features.
At this point you're not comparing the language, you're comparing the compilers!

All and all, I think benchmarking languages is silly and unless your programming a super efficient primes counting program, they shouldn't change your mind on what language you use.
Just use the language that makes you happy and move on.

---

Addendum: after finishing writing this post, I decided to look up if someone else had written anything on the subject.
And who else did but gingerBill, the creator of my [favorite programming language](https://odin-lang.org/): [Why I Hate Language Benchmarks](https://www.gingerbill.org/article/2024/01/22/comparing-language-benchmarks/).
His post is much better than mine, so please check it out.
