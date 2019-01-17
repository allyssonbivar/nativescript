<template>
  <StackLayout>
    <Button @tap="batefoto">Tirar foto</Button>
    <WrapLayout>
      <StackLayout width="50%" v-for="media in medias" :key="media.key">
        <Image v-if="media.media_url" :src="media.media_url"/>
        <Image v-if="media.media_dtcriacao" :src="`${url}/media/download/${media.media_id}`"/>
        <label :text="media.media_nome"/>
      </StackLayout>
    </WrapLayout>
  </StackLayout>
</template>

<script>
import * as camera from "nativescript-camera";
import { service_url } from "../api";
export default {
  name: "bwda-get-picture",
  props: ["value"],
  data: _ => ({ url: service_url() }),
  computed: {
    medias() {
      return this.value.media_checklist_item_resposta.map(e => {
        if (!e.key) e.key = new Date().getTime();
        return e;
      });
    }
  },
  methods: {
    batefoto() {
      camera.requestPermissions().then(_ => {
        camera.takePicture().then(pic => {
          pic = pic._android ? pic._android : pic._ios;
          const media = {
            media_url: pic,
            key: new Date().getTime(),
            media_nome: pic.replace(/.*\/(.*)$/, "$1")
          };
          this.value.media_checklist_item_resposta.push(media);
        });
      });
    }
  }
};
</script>

<style>
</style>
