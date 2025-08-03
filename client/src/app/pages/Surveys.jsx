import React from 'react';
import { useState } from 'react';
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Share2,
  Copy,
  Trash2,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/Table';
import { IconButton } from '../../components/ui/IconButton';

const survey = {
  title: 'IST Survey - Email I have created',
  status: 'Scheduled',
  createdBy: 'Basem Shawaly',
  modifiedAt: '06/10/2022',
  modifiedBy: 'Nermien Emad',
  type: 'Web',
  language: 'English',
  responses: 153,
  createdAt: '06/10/2022',
  expires: '20/10/2022',
  publish: '06/10/2022',
};

const surveyData = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  ...survey,
}));

const tabs = ['All', 'Published', 'Draft', 'Archived', 'Scheduled'];

export const Surveys = () => {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Surveys
        </h1>
        <Button className="flex items-center space-x-2 w-full sm:w-auto">
          <Plus size={16} />
          <span>Create new survey</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 sm:space-x-8 mb-6 border-b border-gray-200 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab
                ? 'text-[#0075BE] border-b-2 border-[#0075BE]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input type="text" placeholder="Search..." className="pl-10" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Title</TableHead>
                <TableHead className="min-w-[120px]">Status</TableHead>
                <TableHead className="min-w-[120px]">Created by</TableHead>
                <TableHead className="min-w-[120px]">Modified at</TableHead>
                <TableHead className="min-w-[120px]">Modified by</TableHead>
                <TableHead className="min-w-[80px]">Type</TableHead>
                <TableHead className="min-w-[100px]">Language</TableHead>
                <TableHead className="min-w-[100px]">Responses</TableHead>
                <TableHead className="min-w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {surveyData.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900 text-sm sm:text-base">
                        {survey.title}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">
                        Created at {survey.createdAt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="primary" size="sm">
                      {survey.status}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">
                      <div>Expires at {survey.expires}</div>
                      <div>Publish at {survey.publish}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {survey.createdBy}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {survey.modifiedAt}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {survey.modifiedBy}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {survey.type}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {survey.language}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm text-gray-600">
                    {survey.responses}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <IconButton title="View" size="sm">
                        <Eye size={14} className="sm:w-4 sm:h-4" />
                      </IconButton>
                      <IconButton title="Download" size="sm">
                        <Download size={14} className="sm:w-4 sm:h-4" />
                      </IconButton>
                      <IconButton title="Share" size="sm">
                        <Share2 size={14} className="sm:w-4 sm:h-4" />
                      </IconButton>
                      <IconButton title="Copy" size="sm">
                        <Copy size={14} className="sm:w-4 sm:h-4" />
                      </IconButton>
                      <IconButton title="More" size="sm">
                        <MoreHorizontal size={14} className="sm:w-4 sm:h-4" />
                      </IconButton>
                      <IconButton title="Delete" size="sm" variant="danger">
                        <Trash2 size={14} className="sm:w-4 sm:h-4" />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700 order-2 sm:order-1">
            Showing 1 to 8 of 8 entries
          </div>
          <div className="flex space-x-1 order-1 sm:order-2">
            {[1, 2, 3, 4, 5, 6].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? 'primary' : 'ghost'}
                size="sm"
                className="w-8 h-8"
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
