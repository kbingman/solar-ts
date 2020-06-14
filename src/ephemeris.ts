import fs from "fs";
import path from "path";

const { readFile } = fs.promises;

const regexes: Record<string, RegExp> = {
  coords: /\w[\w|\s]\=[\s|\-][\d|E|\=|\-|\+|\.]+/g,
  name: /Target\sbody\sname\:\s(\w+)\s/,
  id: /Target\sbody\sname\:[\s\w]+\((.+)\)\s/,
  center: /Center\sbody\sname\:[\s\w]+\((.+)\)\s/,
};

const getCoord = (txt: string): string[] =>
  txt.match(regexes.coords)?.slice(0, 6) || [];

const getData = (regex: RegExp, txt: string) => {
  const match = txt.match(regex);
  return (match && match[1]) || null;
};

const convertCoords = (arr: string[]) =>
  arr
    .map((item) => item.toLowerCase().split("="))
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k.trim()]: Number.parseFloat(v),
      }),
      {}
    );

export const openEphemeris = (): Promise<string> =>
  readFile(path.resolve(__dirname, "../data/oberon-ephemeris.txt"), "utf8");

export const findEphemeris = (txt: string) => ({
  name: getData(regexes.name, txt),
  id: getData(regexes.id, txt),
  center: getData(regexes.center, txt),
  vector: convertCoords(getCoord(txt)),
});
