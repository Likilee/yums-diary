import { getTitleFromPathName } from '@/lib/path'
import { upperFirst } from '@/lib/string'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { TbChevronLeft, TbPalette } from 'react-icons/tb'
import { themeChange } from 'theme-change'

export function TopNavigation() {
  const path = usePathname()
  const router = useRouter()
  const navTitle = getTitleFromPathName(path)
  const daisyUiThemes = [
    'valentine',
    'autumn',
    'retro',
    'coffee',
    'cupcake',
    'lemonade',
    'garden',
    'aqua',
    'lofi',
    'forest',
    'cyberpunk',
    'synthwave',
  ]
  const themesOptions = daisyUiThemes.map((theme) => ({
    key: theme,
    label: upperFirst(theme),
  }))

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])
  const handleClickBack = () => {
    router.back()
  }
  return (
    <header className="navbar bg-base-100 border-b-2 min-h-8 fixed top-0 z-navtop pt-[max(env(safe-area-inset-top),0.5rem)]">
      <div className="navbar-start h-8">
        <button className="btn btn-ghost btn-circle" onClick={handleClickBack}>
          <TbChevronLeft className="text-2xl" />
        </button>
      </div>
      <div className="navbar-center h-8">
        <a className="btn btn-ghost normal-case text-xl">{navTitle}</a>
      </div>
      <div className="navbar-end h-8">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle m-1">
            <TbPalette className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-300 rounded-box w-32"
          >
            {themesOptions.map((theme) => (
              <li key={theme.key}>
                <button
                  data-set-theme={theme.key}
                  className="btn btn-ghost"
                  data-act-class="btn-active"
                >
                  {theme.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
