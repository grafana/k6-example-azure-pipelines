import { check, group, sleep } from "k6";
import http from "k6/http";

// Test configuration
export let options = {
    // Rampup for 10s from 1 to 15, stay at 15, and then down to 0
    stages: [
        { duration: "10s", target: 15 },
        { duration: "20s", target: 15 },
        { duration: "10s", target: 0 }
    ],
    thresholds: {
        "http_req_duration": ["p(95)<250"]
    }
};

// User scenario
export default function() {
    group("Front page", function() {
        // Make a request for the front page HTML (this will not fetch static resources referenced by HTML file)
        let res = http.get("http://test.loadimpact.com/");

        // Make sure the status code is 200 OK
        check(res, {
            "is status 200": (r) => r.status === 200
        });

        // Simulate user reading the page
        sleep(5);
    });
}
