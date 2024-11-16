from abc import ABC, abstractmethod


class IRegionService(ABC):

    @abstractmethod
    def validate_data(self, data: dict) -> bool:
        pass

    @abstractmethod
    def process_request_data(self, data: dict) -> dict:
        pass

class IScraperService(ABC):

    @abstractmethod
    def scrape_events(self, data: dict) -> dict:
        pass
