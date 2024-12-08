export function getAvailableTags(useCases) {
    const tags = new Set();
    useCases.forEach(useCase => {
      useCase.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }
  
  export function getFilteredUseCases(useCases, activeFilters) {
    if (activeFilters.length === 0) return useCases;
    
    return useCases.filter(useCase => 
      useCase.tags.some(tag => activeFilters.includes(tag))
    );
  }
  
  export async function loadUseCases() {
    try {
      const response = await fetch('/src/lib/use-case-data.json');
      const json = await response.json();
      return json.data;
    } catch (error) {
      console.error('Error loading use cases:', error);
      return [];
    }
  }