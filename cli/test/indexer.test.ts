import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { parseSymbols, generateRepoMap, writeRepoMap } from "../src/indexer.js";

test("parseSymbols extracts correct symbols for TS", () => {
  const tsContent = `
export class User {
  id: string;
}
export interface Repository {
  find(id: string): Promise<User>;
}
export type UserID = string;
export async function getUser(id: UserID): Promise<User> {
  return new User();
}
export const someValue = 42;
`;
  const symbols = parseSymbols(tsContent, ".ts");
  assert.equal(symbols.length, 5);
  assert.equal(symbols[0].name, "User");
  assert.equal(symbols[0].type, "class");
  assert.equal(symbols[1].name, "Repository");
  assert.equal(symbols[1].type, "interface");
  assert.equal(symbols[2].name, "UserID");
  assert.equal(symbols[2].type, "type");
  assert.equal(symbols[3].name, "getUser");
  assert.equal(symbols[3].type, "function");
  assert.equal(symbols[4].name, "someValue");
  assert.equal(symbols[4].type, "export");
});

test("parseSymbols extracts correct symbols for Python", () => {
  const pyContent = `
class UserManager:
    def __init__(self):
        pass

def calculate_stats(data):
    return len(data)
`;
  const symbols = parseSymbols(pyContent, ".py");
  assert.equal(symbols.length, 2);
  assert.equal(symbols[0].name, "UserManager");
  assert.equal(symbols[0].type, "class");
  assert.equal(symbols[1].name, "calculate_stats");
  assert.equal(symbols[1].type, "function");
});

test("parseSymbols extracts correct symbols for Go", () => {
  const goContent = `
type DBConfig struct {
	Host string
}
type DBConn interface {
	Query()
}
func Connect(cfg DBConfig) DBConn {
	return nil
}
`;
  const symbols = parseSymbols(goContent, ".go");
  assert.equal(symbols.length, 3);
  assert.equal(symbols[0].name, "DBConfig");
  assert.equal(symbols[0].type, "struct");
  assert.equal(symbols[1].name, "DBConn");
  assert.equal(symbols[1].type, "interface");
  assert.equal(symbols[2].name, "Connect");
  assert.equal(symbols[2].type, "function");
});
test("parseSymbols extracts correct symbols for Kotlin", () => {
  const ktContent = `
data class User(val id: String)
interface UserRepository {
    fun findById(id: String): User?
}
object Database {
    fun connect() {}
}
`;
  const symbols = parseSymbols(ktContent, ".kt");
  assert.equal(symbols.length, 5);
  assert.equal(symbols[0].name, "User");
  assert.equal(symbols[0].type, "class");
  assert.equal(symbols[1].name, "UserRepository");
  assert.equal(symbols[1].type, "interface");
  assert.equal(symbols[2].name, "findById");
  assert.equal(symbols[2].type, "function");
  assert.equal(symbols[3].name, "Database");
  assert.equal(symbols[3].type, "object");
  assert.equal(symbols[4].name, "connect");
  assert.equal(symbols[4].type, "function");
});

test("generateRepoMap indexes supported files and writes repo-map.json", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "aios-indexer-"));
  fs.mkdirSync(path.join(tempDir, "src"));
  fs.writeFileSync(
    path.join(tempDir, "src", "index.ts"),
    "export class App {}"
  );
  fs.writeFileSync(
    path.join(tempDir, "src", "ignored.txt"),
    "ignored"
  );

  const repoMap = generateRepoMap(tempDir);
  assert.ok(repoMap["src/index.ts"]);
  assert.equal(repoMap["src/index.ts"].symbols[0].name, "App");
  assert.ok(!repoMap["src/ignored.txt"]);

  const targetPath = writeRepoMap(tempDir, repoMap);
  assert.ok(fs.existsSync(targetPath));
  const saved = JSON.parse(fs.readFileSync(targetPath, "utf8"));
  assert.equal(saved["src/index.ts"].symbols[0].name, "App");

  // Cleanup
  fs.rmSync(tempDir, { recursive: true, force: true });
});
