'use client';

import Link from 'next/link';

interface MenuItem {
    name: string;
    link: string;
    children?: MenuItem[];
}

interface SideMenuProps {
    items: MenuItem[];
}

interface MenuItemComponentProps {
    item: MenuItem;
    level: number;
    index: number;
    parentNumber?: string;
}

const MenuItemComponent = ({ item, level, index, parentNumber }: MenuItemComponentProps) => {
    const currentNumber = parentNumber ? `${parentNumber}.${index + 1}` : `${index + 1}`;

    const indentClass = level === 0 ? 'pl-4' : level === 1 ? 'pl-8' : 'pl-12';

    return (
        <div className="w-full">
            <div className={`flex items-center justify-between ${indentClass} py-2 px-2 hover:bg-gray-100 cursor-pointer transition-colors duration-200 border-l-2 border-transparent hover:border-blue-400`}>
                <div className="flex items-center space-x-3">
                    {/* Numeración */}
                    <span className="text-sm font-medium text-gray-500 min-w-[.5rem]">{currentNumber}</span>

                    {/* Nombre del item */}
                    <Link href={item.link} className="text-gray-700 text-sm hover:text-blue-600 font-medium flex-1" onClick={(e) => e.stopPropagation()}>
                        {item.name}
                    </Link>
                </div>
            </div>

            {/* Subitems expandibles */}
            {item.children && item.children.length > 0 && (
                <div className="transition-all duration-300 ease-in-out">
                    {item.children.map((child, childIndex) => (
                        <MenuItemComponent key={`${currentNumber}.${childIndex}`} item={child} level={level + 1} index={childIndex} parentNumber={currentNumber} />
                    ))}
                </div>
            )}
        </div>
    );
};

export const SideMenu = ({ items }: SideMenuProps) => {
    return (
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Lista de items */}
            <div className="py-2">
                {items.map((item, index) => (
                    <MenuItemComponent key={index} item={item} level={0} index={index} />
                ))}
            </div>
        </div>
    );
};
