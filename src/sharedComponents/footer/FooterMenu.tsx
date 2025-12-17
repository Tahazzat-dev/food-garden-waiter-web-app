import { FooterMenus } from '@/types/data';

function FooterMenu({ menu }: { menu: FooterMenus }) {
  return (
    <div className='max-w-40'>
      <h5 className='!text-[18px] font-semibold'>{menu?.title}</h5>
      <ul className='mt-3 flex flex-col gap-1'>
        {menu?.links?.map((link) => (
          <li key={link?.url}>
            <a
              href={link?.url}
              className='hover:text-primary text-muted-foreground text-sm duration-300'
            >
              {link?.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterMenu;
