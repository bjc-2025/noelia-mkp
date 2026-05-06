import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from './env'

export const isSanityConfigured = Boolean(projectId && /^[a-z0-9-]+$/.test(projectId))

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
    })
  : null
