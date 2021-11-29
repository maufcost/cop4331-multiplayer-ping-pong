
if exist ./node_modules/ (
	echo Server Ready
) ELSE (
	start npm install
)

if exist ./client/node_modules/ (
	echo Client Ready
) ELSE (
	cd client/
	start npm install
)