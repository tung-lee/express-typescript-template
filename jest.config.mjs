export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["**/*.test.ts"],
	transform: {
	  "^.+\\.tsx?$": "ts-jest",
	},
  };