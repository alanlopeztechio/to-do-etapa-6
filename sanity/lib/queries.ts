import {defineQuery} from 'next-sanity'

export const homePageQuery = defineQuery(`
  *[_type == "home"][0]{
    _id,
    _rev,
    _type,
    overview,
    body,
    showcaseProjects[]{
      _key,
      ...@->{
        _id,
        _type,
        coverImage,
        overview,
        "slug": slug.current,
        tags,
        title,
      }
    },
    title,
  }
`)

export const pagesBySlugQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`)

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    _type,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`)

export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    _id,
    _rev,
    _type,
    footer,
    menuItems[]{
      _key,
      ...@->{
        _type,
        "slug": slug.current,
        title
      }
    },
    footer{
      ...,
      columns[]{
        ...,
        links[]{
          ...,
          "url" : select(
          _type == 'linkExternal' =>url,
          _type == 'linkInternal' =>reference->slug.current
          ),
          _type == 'linkInternal' => {
            "type_reference": reference->_type
          }
        }
      }
    },
    ogImage,
    limitMessage,
    successMessage,
    limit
  }
`)

export const slugsByTypeQuery = defineQuery(`
  *[_type == $type && defined(slug.current)]{"slug": slug.current}
`)
