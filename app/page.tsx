import { AppConfigTable, db } from '@/lib/drizzle'
import { eq } from 'drizzle-orm' 

interface AppConfigValue {
  en: string;
  es?: string;
}

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export default async function Home() {
  const appConfig = await db
    .select()
    .from(AppConfigTable)
    .where(eq(AppConfigTable.title, 'siteTitle'))
    .limit(1)

  const siteTitle = appConfig.length > 0
    ? (appConfig[0].value as AppConfigValue).en
    : 'Default Title'

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center">
      <h1>{siteTitle}</h1>
    </main>
  )
}
