import Vector2d from "./util/vector2d.js";
import Direction from "./util/direction.js";
import Position from "./util/position.js";

const assertInit = (assertType) => console.log("\x1b[34mAsserting " + assertType + "\x1b[0m");
const assert = (actual, expected, msg) => {
    const _test = actual?.equals ? actual.equals(expected) : actual === expected;
    console.log("\x1b[" + (_test ? "32m" : "31m") + "Assert " + (_test ? "success" : "error") + ": " + msg + "\x1b[0m");
}

console.log("Starting testing for Direction, Vector2d and Position class implementations.");

assertInit("Direction.asVector()");
assert(Direction.UP.asVector(), new Vector2d(0, -1), "Direction.UP.asVector() === new Vector2d(0, -1)");
assert(Direction.RIGHT.asVector(), new Vector2d(1, 0), "Direction.RIGHT.asVector() === new Vector2d(1, 0)");
assert(Direction.DOWN.asVector(), new Vector2d(0, 1), "Direction.DOWN.asVector() === new Vector2d(0, 1)");
assert(Direction.LEFT.asVector(), new Vector2d(-1, 0), "Direction.LEFT.asVector() === new Vector2d(-1, 0)");

assertInit("Asserting Vector2d.plus()");
assert(new Vector2d(1, 2).plus(new Vector2d(3, 4)), new Vector2d(4, 6), "new Vector2d(1, 2).plus(new Vector2d(3, 4)) === new Vector2d(4, 6)");

assertInit("Asserting Vector2d.minus()");
assert(new Vector2d(1, 2).minus(new Vector2d(3, 4)), new Vector2d(-2, -2), "new Vector2d(1, 2).minus(new Vector2d(3, 4)) === new Vector2d(-2, -2)");

assertInit("Asserting Position.plus()");
assert(new Position(1, 2).plus(new Vector2d(3, 4)), new Position(4, 6), "new Position(1, 2).plus(new Vector2d(3, 4)) === new Position(4, 6)");

console.log("Finished testing!")
