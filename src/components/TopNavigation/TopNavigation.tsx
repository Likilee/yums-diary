import { getTitleFromPathName } from '@/lib/path'
import { upperFirst } from '@/lib/string'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { TbChevronLeft, TbPalette } from 'react-icons/tb'
import { themeChange } from 'theme-change'

export function TopNavigation() {
  const path = usePathname();
  const navTitle = getTitleFromPathName(path);

  const daisyUiThemes = ['valentine', 'autumn', 'retro', 'coffee']
  const themesOptions = daisyUiThemes.map((theme) => ({
    key: theme,
    label: upperFirst(theme)
  }))

  useEffect(() => {
    themeChange(false)
    // 👆 false parameter is required for react project
  }, [])

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <button className="btn btn-ghost btn-circle">
          <TbChevronLeft className="text-2xl" />
        </button>
      </div>
      <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">{navTitle}</a>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle m-1">
            <TbPalette className="text-2xl" />
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-32"
          >
            {themesOptions.map((theme) => (
              <li key={theme.key}>
                <button data-set-theme={theme.key} data-act-class="ACTIVECLASS">
                  {theme.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
