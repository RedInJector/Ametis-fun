import { defineDocumentType, makeSource } from "contentlayer/source-files";

const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    group:{
      type: 'string',
      required: true,
    },
    orderPosition:{
      type: 'number',
      required: true,
    },
    titleimage:{
      type: 'string',
      required: true,
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/wiki/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "wiki",
  documentTypes: [Post],
});
