import { ModalTrigger } from '@/components/Modal'
import { isSameFirstPath } from '@/lib/path'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { TbCalendar, TbNotebook, TbSquarePlus } from 'react-icons/tb'

interface BottomNavItemProps {
  href: string
}

function BottomNavItem({ href, children }: PropsWithChildren<BottomNavItemProps>) {
  const path = usePathname()
  const isActive = isSameFirstPath(path ?? '', href)

  return (
    <button
      className={classNames(
        isActive ? 'active text-primary-focus border-t-0' : '',
        'transition-all',
      )}
    >
      <Link href={href}>{children}</Link>
    </button>
  )
}

export default function BottomNavigation() {
  const path = usePathname()
  const router = useRouter()

  const handleClickPlus = () => {
    if (path === '/diary') router.push('/new/diary')
  }
  return (
    <>
      <nav className="btm-nav btm-nav-sm border-t border-current z-navbottom box-content">
        <BottomNavItem href="/diary">
          <TbCalendar className="text-2xl" />
        </BottomNavItem>
        <button onClick={handleClickPlus}>
          {path === '/note' ? (
            <ModalTrigger modalId="create_note">
              <TbSquarePlus className="text-2xl" />
            </ModalTrigger>
          ) : (
            <TbSquarePlus className="text-2xl" />
          )}
        </button>
        <BottomNavItem href="/note">
          <TbNotebook className="text-2xl" />
        </BottomNavItem>
        {/* <BottomNavItem href="/search">
          <TbSearch className="text-2xl" />
        </BottomNavItem>
        <button>
          <TbDots className="text-2xl" />
        </button> */}
      </nav>
    </>
  )
}
