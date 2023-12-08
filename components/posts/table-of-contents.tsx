import { Divider } from '@nextui-org/divider';
import React, { useCallback, useEffect, useState } from 'react';

interface Heading {
  value: string;
  depth: number;
  parent: string;
  data: {
    hProperties: {
      id: string;
    };
  };
  children: Heading[];
}

interface TOCComponentProps {
  headings: Heading[];
}

const TOCComponent: React.FC<TOCComponentProps> = ({ headings }) => {
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
  
    let currentHeading = null;
  
    for (const heading of headings) {
      const element = document.getElementById(heading.data.hProperties.id);
  
      if (element && element.offsetTop <= scrollPosition + 250) {
        currentHeading = heading;
      }
  
      if (heading.children.length > 0) {
        for (const childrenHeading of heading.children) {
          const childElement = document.getElementById(childrenHeading.data.hProperties.id);
  
          if (childElement && childElement.offsetTop <= scrollPosition + 250) {
            currentHeading = childrenHeading;
          }
          if (childrenHeading.children.length > 0) {
            for (const grandchildHeading of childrenHeading.children) {
              const grandchildElement = document.getElementById(grandchildHeading.data.hProperties.id);
  
              if (grandchildElement && grandchildElement.offsetTop <= scrollPosition + 250) {
                currentHeading = grandchildHeading;
              }
            }
          }
        }
      }
    }
  
    if (currentHeading) {
      setActiveHeading(currentHeading.data.hProperties.id);
    }
  }, [headings]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const renderHeadings = (headings: Heading[]) => {
  return headings.map((heading) => (
    <li key={heading.data.hProperties.id} className="list-none relative">
      <a
        href={`#${heading.data.hProperties.id}`}
        className={`${
          activeHeading === heading.data.hProperties.id ? 'opacity-100 font-bold' : 'opacity-50'
        } ml-4 block relative pl-6`}
      >
        {heading.value}
      </a>
      {heading.children.length > 0 && (
        <ul className='ml-8 list-inside'>
          {renderHeadings(heading.children)}
        </ul>
      )}

      {activeHeading === heading.data.hProperties.id && (
        <span
          className='absolute top-3.5 ml-4 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-gray-300'
        />
      )}
    </li>
  ));
};

  return (
    <div className="py-4 toc ml-5">
      <h3 className="mb-4">In this article</h3>
      <Divider orientation="horizontal" className="my-4 w-[50%]" />
      <ul>{renderHeadings(headings)}</ul>
    </div>
  );
};

export default TOCComponent;
