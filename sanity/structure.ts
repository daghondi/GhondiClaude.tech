// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: any) =>
  S.list()
    .title('GhondiClaude.me Content')
    .items([
      // Site Settings (singleton)
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      
      S.divider(),

      // Content sections
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('All Projects')
                .child(S.documentTypeList('project').title('All Projects')),
              S.listItem()
                .title('Fine Art')
                .child(
                  S.documentList()
                    .title('Fine Art Projects')
                    .filter('_type == "project" && projectType == "fine-art"')
                ),
              S.listItem()
                .title('Urban Planning')
                .child(
                  S.documentList()
                    .title('Urban Planning Projects')
                    .filter('_type == "project" && projectType == "urban-planning"')
                ),
              S.listItem()
                .title('Tech Lab')
                .child(
                  S.documentList()
                    .title('Tech Lab Projects')
                    .filter('_type == "project" && projectType == "tech-lab"')
                ),
              S.listItem()
                .title('Featured Projects')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "project" && featured == true')
                ),
            ])
        ),

      S.listItem()
        .title('Blog Posts')
        .child(
          S.list()
            .title('Blog Posts')
            .items([
              S.listItem()
                .title('All Posts')
                .child(S.documentTypeList('blogPost').title('All Posts')),
              S.listItem()
                .title('Published Posts')
                .child(
                  S.documentList()
                    .title('Published Posts')
                    .filter('_type == "blogPost" && status == "published"')
                ),
              S.listItem()
                .title('Draft Posts')
                .child(
                  S.documentList()
                    .title('Draft Posts')
                    .filter('_type == "blogPost" && status == "draft"')
                ),
              S.listItem()
                .title('Featured Posts')
                .child(
                  S.documentList()
                    .title('Featured Posts')
                    .filter('_type == "blogPost" && featured == true')
                ),
            ])
        ),

      S.divider(),

      // Taxonomy
      S.listItem()
        .title('Categories')
        .child(S.documentTypeList('category').title('Categories')),
      
      S.listItem()
        .title('Tags')
        .child(S.documentTypeList('tag').title('Tags')),

      S.listItem()
        .title('Authors')
        .child(S.documentTypeList('author').title('Authors')),
    ])
