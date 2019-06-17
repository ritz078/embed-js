import test from "ava"
import { isServicePresent } from "../src/noembed-regex"

const text =
  "Nunquam perdere https://www.youtube.com/watch?v=DYsOIjw8Emg https://a.jpg olla https://b.jpg."

test("noembed-regex : isServicePresent", t => {
  t.true(isServicePresent("youtube", text))
  t.false(isServicePresent("twitter", text))
})
