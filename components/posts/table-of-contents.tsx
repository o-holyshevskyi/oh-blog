import { useTranslations } from 'next-intl';
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
  const t = useTranslations("postPage");

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const renderHeadings = (headings: Heading[]) => {
    return headings.map((heading) => (
      <li key={heading.data.hProperties.id} className="relative">
        <a
          href={`#${heading.data.hProperties.id}`}
          className={`block py-1 pl-3 text-sm border-l-2 transition-colors ${
            activeHeading === heading.data.hProperties.id
              ? 'border-terracotta text-ink dark:text-cream font-medium'
              : 'border-warmgray/30 dark:border-warmgray/10 text-midgray hover:text-ink dark:hover:text-cream'
          }`}
        >
          {heading.value}
        </a>
        {heading.children.length > 0 && (
          <ul className='ml-3'>
            {renderHeadings(heading.children)}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <nav className="py-4">
      <h3 className="text-xs font-sans tracking-wider uppercase text-midgray mb-3">{t("tocHeader")}</h3>
      <ul className="space-y-0.5">{renderHeadings(headings)}</ul>
    </nav>
  );
};

export default TOCComponent;
