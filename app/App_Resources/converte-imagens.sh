#!/bin/bash

# conversão dos ícones para android

convert -resize 240x240 icon.png Android/drawable-xxxhdpi/icon.png
convert -resize 192x192 icon.png Android/drawable-xxhdpi/icon.png
convert -resize 144x144 icon.png Android/drawable-xhdpi/icon.png
convert -resize 96x96 icon.png Android/drawable-hdpi/icon.png
convert -resize 48x48 icon.png Android/drawable-mdpi/icon.png
convert -resize 36x36 icon.png Android/drawable-ldpi/icon.png

# conversão das logos para android

convert -resize 750x782 logo.png Android/drawable-xxxhdpi/logo.png
convert -resize 600x626 logo.png Android/drawable-xxhdpi/logo.png
convert -resize 450x469 logo.png Android/drawable-xhdpi/logo.png
convert -resize 300x313 logo.png Android/drawable-hdpi/logo.png
convert -resize 150x156  logo.png Android/drawable-mdpi/logo.png
convert -resize 112x117 logo.png Android/drawable-ldpi/logo.png

# conversão do background para android

convert -resize 1800x2960 background.png Android/drawable-xxxhdpi/background.png
convert -resize 1440x2368 background.png Android/drawable-xxhdpi/background.png
convert -resize 1080x1776 background.png Android/drawable-xhdpi/background.png
convert -resize 720x1184 background.png Android/drawable-hdpi/background.png
convert -resize 360x592  background.png Android/drawable-mdpi/background.png
convert -resize 270x444 background.png Android/drawable-ldpi/background.png

# TODO: fazer versão ios um dia
