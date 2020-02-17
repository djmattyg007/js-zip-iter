import { TestFixture, Test, Expect } from "alsatian";

import { zip } from "../src";

@TestFixture("Zip")
export default class ZipTest {
    @Test("it supports arrays")
    public itSupportsArrays() {
        const array1 = [1, 2, 3];
        const array2 = ["a", "b", "c"];
        const expected1 = [[1, "a"], [2, "b"], [3, "c"]] as [number, string][];

        const zipped1 = zip(array1, array2);
        Expect([...zipped1]).toEqual(expected1);

        const array3 = [1, 2, 3];
        const array4 = ["a", "b"];
        const expected2 = [[1, "a"], [2, "b"]] as [number, string][];

        const zipped2 = zip(array3, array4);
        Expect([...zipped2]).toEqual(expected2);

        const array5 = [1, 2];
        const array6 = ["a", "b", "c"];
        const array7 = ["@"];
        const expected3 = [[1, "a", "@"]] as [number, string, string][];

        const zipped3 = zip(array5, array6, array7);
        Expect([...zipped3]).toEqual(expected3);
    }

    @Test("it supports strings")
    public itSupportsStrings() {
        const string1 = "aeoe";
        const string2 = "wsm!";
        const expected1 = [["a", "w"], ["e", "s"], ["o", "m"], ["e", "!"]] as [string, string][];

        const zipped1 = zip(string1, string2);
        Expect([...zipped1]).toEqual(expected1);

        const string3 = "long";
        const string4 = "short";
        const string5 = "medium";
        const expected2 = [["l", "s", "m"], ["o", "h", "e"], ["n", "o", "d"], ["g", "r", "i"]] as [string, string, string][];

        const zipped2 = zip(string3, string4, string5);
        Expect([...zipped2]).toEqual(expected2);
    }

    @Test("it supports iterables")
    public itSupportsIterables() {
        const map1 = new Map<string, number>();
        map1.set("a", 1);
        map1.set("b", 2);
        map1.set("c", 3);
        const map2 = new Map<number, string>();
        map2.set(101, "x");
        map2.set(102, "y");
        const set1 = new Set<string>();
        set1.add("a");
        set1.add("b");
        const set2 = new Set<number>();
        set2.add(1);
        set2.add(2);
        set2.add(3);

        const expected1 = [[["a", 1], [101, "x"]], [["b", 2], [102, "y"]]] as [[string, number], [number, string]][];
        const expected2 = [[1, ["a", 1]], [2, ["b", 2]], [3, ["c", 3]]] as [number, [string, number]][];
        const expected3 = [[[101, "x"], "a"], [[102, "y"], "b"]] as [[number, string], string][];
        const expected4 = [["a", 1], ["b", 2]] as [string, number][];
        const expected5 = [
            [["a", 1], "a", [101, "x"], 1],
            [["b", 2], "b", [102, "y"], 2],
        ] as [[string, number], string, [number, string], number][];

        const zipped1 = zip(map1, map2);
        const zipped2 = zip(set2, map1);
        const zipped3 = zip(map2, set1);
        const zipped4 = zip(set1, set2);
        const zipped5 = zip(map1, set1, map2, set2);

        Expect([...zipped1]).toEqual(expected1);
        Expect([...zipped2]).toEqual(expected2);
        Expect([...zipped3]).toEqual(expected3);
        Expect([...zipped4]).toEqual(expected4);
        Expect([...zipped5]).toEqual(expected5);
    }

    @Test("it supports iterators")
    public itSupportsIterators() {
        const map1 = new Map<string, number>();
        map1.set("a", 1);
        map1.set("b", 2);
        map1.set("c", 3);
        const map2 = new Map<number, string>();
        map2.set(101, "x");
        map2.set(102, "y");
        const set1 = new Set<string>();
        set1.add("a");
        set1.add("b");
        const set2 = new Set<number>();
        set2.add(1);
        set2.add(2);
        set2.add(3);

        const expected1 = [[1, "x"], [2, "y"]] as [number, string][];
        const expected2 = [[1, 1], [2, 2], [3, 3]] as [number, number][];
        const expected3 = [["x", "a"], ["y", "b"]] as [string, string][];
        const expected4 = [["a", 1], ["b", 2]] as [string, number][];
        const expected5 = [[1, "a", "x", 1], [2, "b", "y", 2]] as [number, string, string, number][];

        const zipped1 = zip(map1.values(), map2.values());
        const zipped2 = zip(set2.values(), map1.values());
        const zipped3 = zip(map2.values(), set1.values());
        const zipped4 = zip(set1.values(), set2.values());
        const zipped5 = zip(map1.values(), set1.values(), map2.values(), set2.values());

        Expect([...zipped1]).toEqual(expected1);
        Expect([...zipped2]).toEqual(expected2);
        Expect([...zipped3]).toEqual(expected3);
        Expect([...zipped4]).toEqual(expected4);
        Expect([...zipped5]).toEqual(expected5);
    }

    @Test("it supports generators")
    public itSupportsGenerators() {
        const genFuncNumbers = function*(count: number): Generator<number> {
            for (let x = 0; x < count; x++) {
                yield x;
            }
        }

        const genFuncChars = function*(charStart: number, count: number): Generator<string> {
            const charFinish = charStart + Math.abs(count);
            for (let x = charStart; x < charFinish; x++) {
                yield String.fromCharCode(x);
            }
        }

        const expected1 = [[0, "A"], [1, "B"], [2, "C"]] as [number, string][];
        const expected2 = [[0, "F"], [1, "G"]] as [number, string][];
        const expected3 = [["P", 0, "K"], ["Q", 1, "L"], ["R", 2, "M"], ["S", 3, "N"]] as [string, number, string][];

        const zipped1 = zip(genFuncNumbers(3), genFuncChars(65, 4));
        const zipped2 = zip(genFuncNumbers(5), genFuncChars(70, 2));
        const zipped3 = zip(genFuncChars(80, 4), genFuncNumbers(5), genFuncChars(75, 4));

        Expect([...zipped1]).toEqual(expected1);
        Expect([...zipped2]).toEqual(expected2);
        Expect([...zipped3]).toEqual(expected3);
    }

    @Test("it supports mixing arrays, iterables, iterators and generators")
    public itSupportsMixing() {
        const array1 = [1, 2, 3, 4];
        const string1 = "abcdef";
        const map1 = new Map<string, number>();
        map1.set("a", 1);
        map1.set("b", 2);
        map1.set("c", 3);
        const genFuncNumbers = function*(count: number): Generator<number> {
            for (let x = 0; x < count; x++) {
                yield x;
            }
        }

        const expected1 = [
            [1, "a", ["a", 1], 1, 0],
            [2, "b", ["b", 2], 2, 1],
            [3, "c", ["c", 3], 3, 2],
        ] as [number, string, [string, number], number, number][];

        const zipped1 = zip(array1, string1, map1, map1.values(), genFuncNumbers(3));

        Expect([...zipped1]).toEqual(expected1);
    }
}
