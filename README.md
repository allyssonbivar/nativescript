# bwda-nativescript

Aplicativo mobile do sistema BWDA 5

## como desenvolver

```bash
cd bwda-nativescript
npm install
npm run dev
# abra um segundo terminal e 
npm run devtools
```

se o desenvolvimento for no dispositivo real e não no emulador, é importante
informar ao devtools o ip do aparelho. vide mais detalhes no **app.js**

## como publicar

Edite a versão do app em `bwda-nativescript/app/App_Resources/Android/AndroidManifest.xml`

```xml
<!-- altere o version code eo version name -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
	package="__PACKAGE__"
	android:versionCode="10001"
	android:versionName="1.0.1">
  <!-- ... -->
</manifest>
```

Altere também no `package.json` em **bwda-natiescript**


Em seguida, empacote pra release


```bash
npm run release
```

Isso gera o **bwda5.apk** na raiz do repositório
