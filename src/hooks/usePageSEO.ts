import { useEffect } from 'react';
import { updateMetaTags, getRouteMetadata, MetaTagConfig } from '../utils/metaTags';

/**
 * Hook to automatically inject and synchronize dynamic meta tags,
 * OpenGraph headers, Twitter Cards, and Schema.org JSON-LD scripts
 * whenever navigation happens or custom metadata is supplied.
 */
export function usePageSEO(
  view: string,
  serviceId?: string,
  customConfig?: Partial<MetaTagConfig>
): void {
  useEffect(() => {
    // 1. Generate base metadata for route
    const baseMetadata = getRouteMetadata(view, serviceId);

    // 2. Merge any custom overrides provided by the calling view
    const mergedConfig: MetaTagConfig = {
      ...baseMetadata,
      ...customConfig,
    };

    // 3. Update DOM document head
    updateMetaTags(mergedConfig);
  }, [view, serviceId, customConfig]);
}
