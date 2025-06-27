import { useState } from "react";
import { X, Plus, Building, MapPin, DollarSign, Users, Trophy, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tabKeys = [
  { key: "basicinformation", label: "Overview" },
  { key: "financial", label: "Financial" },
  { key: "placement", label: "Placement" },
  { key: "studentlife", label: "Campus Life" }
];

const comparisonData = [
  {
    category: "Overview",
    key: "basicinformation",
    fields: [
      { key: "name", label: "College Name", icon: Building },
      { key: "location", label: "Location", icon: MapPin },
      { key: "type", label: "Type", icon: Building },
      { key: "ranking", label: "Ranking", icon: Trophy },
      { key: "rating", label: "Rating", icon: Star }
    ]
  },
  {
    category: "Financial",
    key: "financial",
    fields: [
      { key: "tuitionFee", label: "Tuition Fee", icon: DollarSign },
      { key: "hostelFee", label: "Hostel Fee", icon: DollarSign },
      { key: "totalFee", label: "Total Annual Fee", icon: DollarSign }
    ]
  },
  {
    category: "Placement",
    key: "placement",
    fields: [
      { key: "avgPackage", label: "Average Package", icon: DollarSign },
      { key: "highestPackage", label: "Highest Package", icon: DollarSign },
      { key: "placementRate", label: "Placement Rate", icon: Trophy }
    ]
  },
  {
    category: "Campus Life",
    key: "studentlife",
    fields: [
      { key: "totalStudents", label: "Total Students", icon: Users },
      { key: "facultyRatio", label: "Faculty-Student Ratio", icon: Users },
      { key: "campusSize", label: "Campus Size", icon: Building }
    ]
  }
];

const bestFieldConfig = {
  ranking: { higherBetter: false, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  rating: { higherBetter: true, parse: v => parseFloat(String(v).split('/')[0]) },
  placementRate: { higherBetter: true, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  avgPackage: { higherBetter: true, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  highestPackage: { higherBetter: true, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  tuitionFee: { higherBetter: false, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  hostelFee: { higherBetter: false, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  totalFee: { higherBetter: false, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  totalStudents: { higherBetter: true, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  facultyRatio: { higherBetter: false, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
  campusSize: { higherBetter: true, parse: v => parseFloat(String(v).replace(/[^\d.]/g, '')) },
};

const getFieldValue = (college, key) => {
  switch (key) {
    case "name":
      return college.name;
    case "location":
      return college.location;
    case "type":
      return college.type || "N/A";
    case "ranking":
      return college.ranking || "N/A";
    case "rating":
      return college.rating ? `${college.rating}/5` : "N/A";
    case "tuitionFee":
      return college.fees?.tuition || "N/A";
    case "hostelFee":
      return college.fees?.hostel || "N/A";
    case "totalFee":
      return college.fees?.total || "N/A";
    case "avgPackage":
      return college.placement?.averagePackage || "N/A";
    case "highestPackage":
      return college.placement?.highestPackage || "N/A";
    case "placementRate":
      return college.placement?.placementRate || "N/A";
    case "totalStudents":
      return college.students?.toLocaleString() || "N/A";
    case "facultyRatio":
      return college.facultyRatio || "N/A";
    case "campusSize":
      return college.campusSize || "N/A";
    default:
      return "N/A";
  }
};

const getBestValue = (colleges, key) => {
  if (!Array.isArray(colleges) || colleges.length === 0) return null;
  const config = bestFieldConfig[key];
  if (!config) return null;
  const values = colleges.map(college => {
    if (!college) return null;
    const value = getFieldValue(college, key);
    if (value === "N/A" || value === undefined || value === null) return null;
    const numericValue = config.parse(value);
    return { college, value, numericValue };
  }).filter(item => item && item.numericValue !== null && !isNaN(item.numericValue));
  if (values.length === 0) return null;
  const best = config.higherBetter
    ? values.reduce((max, item) => item.numericValue > max.numericValue ? item : max)
    : values.reduce((min, item) => item.numericValue < min.numericValue ? item : min);
  return best.college._id;
};

const CollegeComparison = ({ colleges = [], onRemoveCollege, onAddCollege }) => {
  const [activeTab, setActiveTab] = useState(tabKeys[0].key);

  if (colleges.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Colleges Selected</h3>
          <p className="text-gray-600 mb-4">
            Add colleges to compare their features, fees, and placement statistics.
          </p>
          <Button onClick={onAddCollege}>
            <Plus className="h-4 w-4 mr-2" />
            Add Colleges to Compare
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Table header: sticky top row for college names
  const TableHeader = () => (
    <div className="grid" style={{ gridTemplateColumns: `200px repeat(${colleges.length}, minmax(180px, 1fr))` }}>
      <div className="sticky left-0 z-20 bg-gradient-to-b from-blue-50 to-white rounded-tl-xl border-r border-b p-4 font-semibold text-gray-700 text-left shadow-sm">&nbsp;</div>
      {colleges.map((college, idx) => {
        let imageUrl = null;
        if (college.profileImage) {
          imageUrl = college.profileImage.startsWith('http')
            ? college.profileImage
            : `http://localhost:5000${college.profileImage}`;
        } else if (college.bannerImage) {
          imageUrl = college.bannerImage.startsWith('http')
            ? college.bannerImage
            : `http://localhost:5000${college.bannerImage}`;
        }
        return (
          <div
            key={college._id}
            className="border-b border-r p-4 pr-8 bg-gradient-to-b from-blue-50 to-white font-semibold text-center whitespace-nowrap min-w-[180px] flex flex-col items-center justify-between relative rounded-tr-xl first:rounded-tr-none shadow-sm"
          >
            <div className="flex flex-col items-center justify-center gap-2 w-full">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={college.name + ' logo'}
                  className="w-12 h-12 rounded-full object-cover border border-blue-200 shadow-sm bg-white"
                />
              ) : (
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold">
                  <Building className="h-6 w-6" />
                </span>
              )}
              <span className="truncate font-bold text-base mt-1" title={college.name}>{college.name}</span>
              <span className="text-xs text-gray-500 mt-0.5">{college.location}</span>
              {college.type && (
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 rounded px-2 py-0.5 mt-0.5">{college.type}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Table body: sticky left column for field labels
  const TableBody = (fields) => (
    <div>
      {fields.map((field, rowIdx) => {
        const Icon = field.icon;
        const bestCollegeId = getBestValue(colleges, field.key);
        return (
          <div key={field.key} className={`grid border-b last:border-b-0 ${rowIdx % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`} style={{ gridTemplateColumns: `200px repeat(${colleges.length}, minmax(180px, 1fr))` }}>
            {/* Sticky field label */}
            <div className="sticky left-0 z-10 bg-gray-100 border-r p-4 flex items-center gap-2 font-medium text-gray-700 min-w-[200px] shadow-sm rounded-bl-xl">
              {Icon && <Icon className="h-4 w-4 text-gray-500" />}
              <span>{field.label}</span>
            </div>
            {colleges.map((college) => {
              const value = getFieldValue(college, field.key);
              const isBest = bestCollegeId === college._id;
              return (
                <div
                  key={college._id}
                  className={`p-4 border-r last:border-r-0 flex items-center justify-between min-w-[180px] max-w-xs whitespace-nowrap text-base font-medium transition hover:bg-blue-50 ${
                    isBest ? 'bg-green-50 border-green-200 font-semibold shadow-sm' : 'border-gray-200'
                  }`}
                  title={value}
                >
                  <span className="truncate">{value}</span>
                  {isBest && value !== 'N/A' && (
                    <Badge variant="outline" className="rounded-full bg-green-500/10 text-green-700 border-green-300 text-xs ml-2 flex items-center gap-1 px-3 py-1 font-semibold shadow-sm">
                      <Trophy className="h-3 w-3 mr-1 text-yellow-500" /> Best
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">College Comparison</h2>
          <p className="text-gray-600">
            Compare {colleges.length} college{colleges.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={onAddCollege} disabled={colleges.length >= 6}>
          <Plus className="h-4 w-4 mr-2" />
          Add College
        </Button>
      </div>
      {/* Modern Table-like Comparison */}
      <Card className="overflow-x-auto rounded-xl shadow-lg border bg-white">
        <CardHeader className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b rounded-t-xl shadow-sm">
          <CardTitle>Detailed Comparison</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto max-w-full">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4 sticky top-0 z-20 bg-white/95 backdrop-blur border-b rounded-t-xl">
                {tabKeys.map(tab => (
                  <TabsTrigger key={tab.key} value={tab.key}>{tab.label}</TabsTrigger>
                ))}
              </TabsList>
              {comparisonData.map((category) => (
                <TabsContent key={category.key} value={category.key} className="p-0">
                  <div className="min-w-fit">
                    {TableHeader()}
                    {TableBody(category.fields)}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CollegeComparison; 