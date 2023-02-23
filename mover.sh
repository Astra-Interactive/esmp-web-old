while true
do
for entry in "/usr/games/minecraft/server/plugins/ImageMaps/images"/*
do
	cp "$entry" "/var/www/html/images"
done

> data
for entry in "/var/www/html/images"/*
do
	echo "$(basename "$entry")" >> data
done
echo "ImageMover sleeps for 120 sec"
sleep 120
done
