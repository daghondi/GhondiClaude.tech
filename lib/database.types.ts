export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analytics: {
        Row: {
          browser: string | null
          country: string | null
          created_at: string
          device_type: string | null
          duration: number | null
          id: string
          ip_address: unknown | null
          os: string | null
          path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration?: number | null
          id?: string
          ip_address?: unknown | null
          os?: string | null
          path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          browser?: string | null
          country?: string | null
          created_at?: string
          device_type?: string | null
          duration?: number | null
          id?: string
          ip_address?: unknown | null
          os?: string | null
          path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_post_tags: {
        Row: {
          blog_post_id: string
          tag_id: string
        }
        Insert: {
          blog_post_id: string
          tag_id: string
        }
        Update: {
          blog_post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_blog_post_id_fkey"
            columns: ["blog_post_id"]
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      blog_posts: {
        Row: {
          category_id: string | null
          comment_count: number | null
          content: string
          created_at: string
          created_by: string | null
          excerpt: string | null
          featured: boolean | null
          featured_image_id: string | null
          id: string
          like_count: number | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          reading_time: number | null
          slug: string
          social_image_id: string | null
          status: string | null
          subtitle: string | null
          title: string
          updated_at: string
          view_count: number | null
        }
        Insert: {
          category_id?: string | null
          comment_count?: number | null
          content: string
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_id?: string | null
          id?: string
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug: string
          social_image_id?: string | null
          status?: string | null
          subtitle?: string | null
          title: string
          updated_at?: string
          view_count?: number | null
        }
        Update: {
          category_id?: string | null
          comment_count?: number | null
          content?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string | null
          featured?: boolean | null
          featured_image_id?: string | null
          id?: string
          like_count?: number | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          reading_time?: number | null
          slug?: string
          social_image_id?: string | null
          status?: string | null
          subtitle?: string | null
          title?: string
          updated_at?: string
          view_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_featured_image_id_fkey"
            columns: ["featured_image_id"]
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_social_image_id_fkey"
            columns: ["social_image_id"]
            referencedRelation: "media"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      comments: {
        Row: {
          author_email: string
          author_name: string
          author_website: string | null
          blog_post_id: string
          content: string
          created_at: string
          id: string
          ip_address: unknown | null
          parent_id: string | null
          status: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          author_email: string
          author_name: string
          author_website?: string | null
          blog_post_id: string
          content: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          parent_id?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          author_email?: string
          author_name?: string
          author_website?: string | null
          blog_post_id?: string
          content?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          parent_id?: string | null
          status?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_blog_post_id_fkey"
            columns: ["blog_post_id"]
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "comments"
            referencedColumns: ["id"]
          }
        ]
      }
      contact_submissions: {
        Row: {
          budget_range: string | null
          company: string | null
          created_at: string
          email: string
          id: string
          ip_address: unknown | null
          message: string
          metadata: Json | null
          name: string
          phone: string | null
          project_type: string | null
          status: string | null
          subject: string | null
          timeline: string | null
          updated_at: string
          user_agent: string | null
        }
        Insert: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email: string
          id?: string
          ip_address?: unknown | null
          message: string
          metadata?: Json | null
          name: string
          phone?: string | null
          project_type?: string | null
          status?: string | null
          subject?: string | null
          timeline?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Update: {
          budget_range?: string | null
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          ip_address?: unknown | null
          message?: string
          metadata?: Json | null
          name?: string
          phone?: string | null
          project_type?: string | null
          status?: string | null
          subject?: string | null
          timeline?: string | null
          updated_at?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          created_by: string | null
          file_size: number | null
          filename: string
          height: number | null
          id: string
          metadata: Json | null
          mime_type: string | null
          original_name: string | null
          public_url: string | null
          storage_path: string
          updated_at: string
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          created_by?: string | null
          file_size?: number | null
          filename: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          original_name?: string | null
          public_url?: string | null
          storage_path: string
          updated_at?: string
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          created_by?: string | null
          file_size?: number | null
          filename?: string
          height?: number | null
          id?: string
          metadata?: Json | null
          mime_type?: string | null
          original_name?: string | null
          public_url?: string | null
          storage_path?: string
          updated_at?: string
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          location: string | null
          updated_at: string
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          location?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      project_media: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          media_id: string
          project_id: string
          sort_order: number | null
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          media_id: string
          project_id: string
          sort_order?: number | null
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          media_id?: string
          project_id?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_media_media_id_fkey"
            columns: ["media_id"]
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          }
        ]
      }
      project_tags: {
        Row: {
          project_id: string
          tag_id: string
        }
        Insert: {
          project_id: string
          tag_id: string
        }
        Update: {
          project_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tags_project_id_fkey"
            columns: ["project_id"]
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_tags_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tags"
            referencedColumns: ["id"]
          }
        ]
      }
      projects: {
        Row: {
          category_id: string | null
          client: string | null
          collaborators: string[] | null
          content: string | null
          created_at: string
          created_by: string | null
          description: string | null
          end_date: string | null
          excerpt: string | null
          external_links: Json | null
          featured: boolean | null
          featured_image_id: string | null
          id: string
          location: string | null
          meta_description: string | null
          meta_title: string | null
          project_type: string
          published_at: string | null
          slug: string
          social_image_id: string | null
          start_date: string | null
          status: string | null
          subtitle: string | null
          technologies: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          category_id?: string | null
          client?: string | null
          collaborators?: string[] | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          excerpt?: string | null
          external_links?: Json | null
          featured?: boolean | null
          featured_image_id?: string | null
          id?: string
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          project_type: string
          published_at?: string | null
          slug: string
          social_image_id?: string | null
          start_date?: string | null
          status?: string | null
          subtitle?: string | null
          technologies?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          category_id?: string | null
          client?: string | null
          collaborators?: string[] | null
          content?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          end_date?: string | null
          excerpt?: string | null
          external_links?: Json | null
          featured?: boolean | null
          featured_image_id?: string | null
          id?: string
          location?: string | null
          meta_description?: string | null
          meta_title?: string | null
          project_type?: string
          published_at?: string | null
          slug?: string
          social_image_id?: string | null
          start_date?: string | null
          status?: string | null
          subtitle?: string | null
          technologies?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_featured_image_id_fkey"
            columns: ["featured_image_id"]
            referencedRelation: "media"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_social_image_id_fkey"
            columns: ["social_image_id"]
            referencedRelation: "media"
            referencedColumns: ["id"]
          }
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          key: string
          type: string | null
          updated_at: string
          value: Json | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          key: string
          type?: string | null
          updated_at?: string
          value?: Json | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          key?: string
          type?: string | null
          updated_at?: string
          value?: Json | null
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          name: string | null
          subscription_date: string
          is_active: boolean
          subscription_source: string | null
          verification_token: string | null
          verified_at: string | null
          unsubscribe_token: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          subscription_date?: string
          is_active?: boolean
          subscription_source?: string | null
          verification_token?: string | null
          verified_at?: string | null
          unsubscribe_token?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          subscription_date?: string
          is_active?: boolean
          subscription_source?: string | null
          verification_token?: string | null
          verified_at?: string | null
          unsubscribe_token?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      newsletter_campaigns: {
        Row: {
          id: string
          title: string
          subject: string
          content: string
          html_content: string | null
          status: string
          scheduled_at: string | null
          sent_at: string | null
          recipient_count: number
          delivered_count: number
          opened_count: number
          clicked_count: number
          created_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subject: string
          content: string
          html_content?: string | null
          status?: string
          scheduled_at?: string | null
          sent_at?: string | null
          recipient_count?: number
          delivered_count?: number
          opened_count?: number
          clicked_count?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subject?: string
          content?: string
          html_content?: string | null
          status?: string
          scheduled_at?: string | null
          sent_at?: string | null
          recipient_count?: number
          delivered_count?: number
          opened_count?: number
          clicked_count?: number
          created_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_campaigns_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      newsletter_campaign_sends: {
        Row: {
          id: string
          campaign_id: string
          subscriber_id: string
          sent_at: string
          delivered_at: string | null
          opened_at: string | null
          clicked_at: string | null
          bounced_at: string | null
          unsubscribed_at: string | null
          error_message: string | null
        }
        Insert: {
          id?: string
          campaign_id: string
          subscriber_id: string
          sent_at?: string
          delivered_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          bounced_at?: string | null
          unsubscribed_at?: string | null
          error_message?: string | null
        }
        Update: {
          id?: string
          campaign_id?: string
          subscriber_id?: string
          sent_at?: string
          delivered_at?: string | null
          opened_at?: string | null
          clicked_at?: string | null
          bounced_at?: string | null
          unsubscribed_at?: string | null
          error_message?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "newsletter_campaign_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "newsletter_campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "newsletter_campaign_sends_subscriber_id_fkey"
            columns: ["subscriber_id"]
            referencedRelation: "newsletter_subscribers"
            referencedColumns: ["id"]
          }
        ]
      }
      tags: {
        Row: {
          color: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          updated_at: string
          usage_count: number | null
        }
        Insert: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
          usage_count?: number | null
        }
        Update: {
          color?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
          usage_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
