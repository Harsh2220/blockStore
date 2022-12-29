import { Orbis } from "@orbisclub/orbis-sdk";
import React, { useState, useEffect } from 'react';

let orbis = new Orbis();

export default function orbisPage() {

	/** The user object */
	// const [user, setUser] = useState();
const user = '';
	/** Calls the Orbis SDK and handle the results */
	async function connect() {
    let res = await orbis.connect();

		/** Check if connection is successful or not */
		if(res.status == 200) {
			console.log("DID is " + res.did);
			// setUser(res.did);
		} else {
			console.log("Error connecting to Ceramic: ", res);
			alert("Error connecting to Ceramic.");
		}
	}

	return(
		<div>
			{user ?
				<p>Connected with: {user}</p>
			:
				<button onClick={() => connect()}>Connect</button>
			}
		</div>
	)
}