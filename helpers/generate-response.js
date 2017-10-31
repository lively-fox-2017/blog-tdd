'use strict'

module.exports = (status, message, payload, err) => {
	return {
		status: status,
		message: status === 200 ? `Success: ${message}.` : `Error: ${message}.`,
		payload: payload,
		err: err 
	}
};