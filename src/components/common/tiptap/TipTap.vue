<template>
  <div class="editor" v-if="editor">
    <menu-bar class="editor__header" :editor="editor" />
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import CharacterCount from '@tiptap/extension-character-count'
import Collaboration from '@tiptap/extension-collaboration'
import Highlight from '@tiptap/extension-highlight'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import StarterKit from '@tiptap/starter-kit'
import { Editor, EditorContent } from '@tiptap/vue-2'
import * as Y from 'yjs'

import MenuBar from './MenuBar.vue'

export default {
  components: {
    EditorContent,
    MenuBar,
  },

  data() {
    return {
      editor: null,
    }
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  watch: {
    value(value) {
      // HTML
      const isSame = this.editor.getHTML() === value

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value);
      if (isSame) return;
      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    const ydoc = new Y.Doc()
    this.editor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        TaskList,
        TaskItem,
        Collaboration.configure({
          document: ydoc,
        }),
        CharacterCount.configure({
          limit: 10000,
        }),
      ],
      onUpdate: () => {
        // HTML
        this.$emit('input', this.editor.getHTML());

        // JSON
        // this.$emit('input', this.editor.getJSON());
      },
    })
  },
  beforeUnmount() {
    this.editor.destroy()
    this.provider.destroy()
  },
}
</script>

<style>
.editor__content {
  width: 100%;
  max-width: 1000px;
  height: 60vh;
  margin: auto;
  margin-top: 10px;
  padding: 0 4px 0 10px;
  overflow: scroll;
  border-bottom: 3px solid var(--navy);
}
.editor__content > div {
  box-sizing: border-box;
  min-height: 100%;
  height: max-content;
  padding: 1px 15px;
  background-color: var(--gray);
}
.editor__content::-webkit-scrollbar {
  position: absolute;
  border-radius: 3px;
  width: 6px;
  background-color: var(--white);
}
.editor__content::-webkit-scrollbar-thumb {
  width: 6px;
  background-color: var(--navy);
  border-radius: 3px;
}
.editor__content > div:focus {
  outline: none;
}
</style>