import { ModalTrigger } from '@/components/Modal'
import { isSameFirstPath } from '@/lib/path'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'
import {
  TbBook2,
  TbCalendar,
  TbDots,
  TbHome,
  TbNotebook,
  TbSearch,
  TbSquarePlus,
} from 'react-icons/tb'

interface BottomNavItemProps {
  href: string
}

function BottomNavItem({ href, children }: PropsWithChildren<BottomNavItemProps>) {
  const path = usePathname()
  const isActive = isSameFirstPath(path ?? '', href)

  return (
    <button
      className={classNames(isActive ? 'active text-primary-focus' : '', 'transition-all')}
    >
      <Link href={href}>{children}</Link>
    </button>
  )
}

export default function BottomNavigation() {
  const path = usePathname()

  return (
    <>
      <div className="btm-nav btm-nav-sm static">
        <BottomNavItem href="/">
          <TbCalendar className="text-2xl" />
        </BottomNavItem>
        <button>
          <ModalTrigger modalId="create_note">
            <TbSquarePlus className="text-2xl" />
          </ModalTrigger>
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
      </div>
    </>
  )
}
