"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Location {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface MarineData {
  current: {
    wave_height: number;
    sea_surface_temperature: number;
    time: string;
  };
  current_units: {
    wave_height: string;
    sea_surface_temperature: string;
  };
}

export default function Home() {
  const [search, setSearch] = React.useState("");
  const [locations, setLocations] = React.useState<Location[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);
  const [marineData, setMarineData] = React.useState<MarineData | null>(null);
  const [isLoadingMarine, setIsLoadingMarine] = React.useState(false);

  const searchLocations = async (query: string) => {
    if (query.length < 3) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=10&language=en&format=json`
      );
      const data = await response.json();
      setLocations(data.results || []);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMarineData = async (location: Location) => {
    setIsLoadingMarine(true);
    try {
      const response = await fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${location.latitude}&longitude=${location.longitude}&current=wave_height,sea_surface_temperature`
      );
      const data = await response.json();
      setMarineData(data);
    } catch (error) {
      console.error("Failed to fetch marine data:", error);
      setMarineData(null);
    } finally {
      setIsLoadingMarine(false);
    }
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    fetchMarineData(location);
  };

  React.useEffect(() => {
    const debounce = setTimeout(() => {
      if (search) {
        searchLocations(search);
      } else {
        setLocations([]);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [search]);

  const LoadingState = () => (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[120px]" />
                <Skeleton className="h-3 w-[80px]" />
              </div>
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen p-8">
      <main className="container mx-auto max-w-3xl">
        <Card className="border-none shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold">Surf Report</CardTitle>
            <CardDescription className="text-lg">
              Search for a location to get the surf report
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="mt-4 space-y-4">
              {selectedLocation && (
                <Card className="bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {selectedLocation.name}, {selectedLocation.country}
                    </CardTitle>
                    <CardDescription>
                      {selectedLocation.latitude.toFixed(4)}°, {selectedLocation.longitude.toFixed(4)}°
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isLoadingMarine ? (
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                      </div>
                    ) : marineData ? (
                      <div className="space-y-2">
                        {marineData.current.wave_height !== null && marineData.current.wave_height !== undefined ? (
                          <p>Wave Height: {marineData.current.wave_height}{marineData.current_units.wave_height}</p>
                        ) : (
                          <p className="text-muted-foreground">Wave height data not available for this location</p>
                        )}
                        {marineData.current.sea_surface_temperature !== null && marineData.current.sea_surface_temperature !== undefined ? (
                          <p>Water Temperature: {marineData.current.sea_surface_temperature}{marineData.current_units.sea_surface_temperature}</p>
                        ) : (
                          <p className="text-muted-foreground">Water temperature data not available for this location</p>
                        )}
                        <p className="text-sm text-muted-foreground">Last updated: {new Date(marineData.current.time).toLocaleString()}</p>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Failed to load marine data</p>
                    )}
                  </CardContent>
                </Card>
              )}

              {isLoading ? (
                <LoadingState />
              ) : locations.length > 0 ? (
                <div className="grid gap-4">
                  {locations.map((location) => (
                    <Card
                      key={`${location.latitude}-${location.longitude}`}
                      className="cursor-pointer transition-colors hover:bg-muted"
                      onClick={() => handleLocationSelect(location)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{location.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {location.country}
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {location.latitude.toFixed(2)}°, {location.longitude.toFixed(2)}°
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : search.length >= 3 ? (
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No locations found
                  </CardContent>
                </Card>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
