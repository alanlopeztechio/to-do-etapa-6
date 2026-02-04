import {CogIcon, InfoOutlineIcon, SparklesIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: CogIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'pagesRegistered',
      title: 'Pages Registered',
      type: 'array',
      description: 'List of all pages registered in the site.',
      of: [
        {
          type: 'url',
          validation: (Rule) =>
            Rule.required().uri({scheme: ['http', 'https'], allowRelative: true}),
        },
      ],
    }),
    defineField({
      name: 'menuItems',
      title: 'Menu Item list',
      description: 'Links displayed on the header of your site.',
      type: 'array',
      of: [
        {
          title: 'Reference',
          type: 'reference',
          to: [
            {
              type: 'home',
            },
            {
              type: 'page',
            },
            {
              type: 'project',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'limitMessage',
      type: 'object',
      title: 'Limit Message',
      description: 'Message displayed when user reaches the limit of allowed actions.',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título',
          type: 'array',
          of: [
            {
              type: 'block',
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                  {title: 'Code', value: 'code'},
                  {title: 'Underline', value: 'underline'},
                  {title: 'Strike', value: 'strike-through'},
                  {
                    title: 'Texto Primario',
                    value: 'text_primary',
                    component: (props) => {
                      const children = Array.isArray(props.children)
                        ? props.children.map((child, i) => <span key={i}> {child} </span>)
                        : props.children
                      return <span className="text-primary"> {children} </span>
                    },
                    icon: SparklesIcon,
                  },
                  {
                    title: 'Texto Secundario',
                    value: 'text_secondary',
                    component: (props) => {
                      const children = Array.isArray(props.children)
                        ? props.children.map((child, i) => <span key={i}>{child}</span>)
                        : props.children

                      return <span className="text-muted-foreground text-pretty">{children}</span>
                    },
                    icon: InfoOutlineIcon,
                  },
                ],
              },
            },
          ],
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [{type: 'string'}],
        }),
      ],
    }),
    defineField({
      name: 'successMessage',
      type: 'object',
      title: 'Success Message',
      description: 'Message displayed when user successfully upgrades to premium.',
      fields: [
        defineField({
          name: 'titulo',
          title: 'Título',
          type: 'array',
          of: [
            {
              type: 'block',
              marks: {
                decorators: [
                  {title: 'Strong', value: 'strong'},
                  {title: 'Emphasis', value: 'em'},
                  {title: 'Code', value: 'code'},
                  {title: 'Underline', value: 'underline'},
                  {title: 'Strike', value: 'strike-through'},
                  {
                    title: 'Texto Primario',
                    value: 'text_primary',
                    component: (props) => {
                      const children = Array.isArray(props.children)
                        ? props.children.map((child, i) => <span key={i}> {child} </span>)
                        : props.children
                      return <span className="text-primary"> {children} </span>
                    },
                    icon: SparklesIcon,
                  },
                  {
                    title: 'Texto Secundario',
                    value: 'text_secondary',
                    component: (props) => {
                      const children = Array.isArray(props.children)
                        ? props.children.map((child, i) => <span key={i}>{child}</span>)
                        : props.children

                      return <span className="text-muted-foreground text-pretty">{children}</span>
                    },
                    icon: InfoOutlineIcon,
                  },
                ],
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'limit',
      type: 'number',
      title: 'Action Limit',
      description: 'Number of free actions allowed before showing the limit message.',
      validation: (Rule) => Rule.min(1).required(),
    }),
    defineField({
      name: 'footer',
      type: 'footer',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Displayed on social cards and search engine results.',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Settings',
        subtitle: 'Menu Items, Footer Info, and Open Graph Image',
      }
    },
  },
})
